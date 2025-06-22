import os
import sqlite3
import json # Import json module
from typing import List, Dict, Any # Add Any for flexible parsing
from dotenv import load_dotenv
from openai import OpenAI
# from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Load environment variables and instantiate client
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("Make sure .env contains OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# Path to your existing user database
db_path = "my_database.db"

# --- Helper functions ---
def load_roles() -> Dict[str, str]:
    """
    Load team roles from the users table.
    Returns a dict mapping user name to role.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('SELECT name, role FROM users')
    rows = cursor.fetchall()
    conn.close()
    return {name: role for name, role in rows}


def ask_openai(system_prompt: str, user_prompt: str, max_tokens: int = 500, json_mode: bool = False) -> str:
    """
    Send a chat completion request to OpenAI and return the text response.
    Added json_mode parameter for structured output.
    """
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    
    response_format = {"type": "json_object"} if json_mode else {"type": "text"}

    resp = client.chat.completions.create(
        model="gpt-3.5-turbo-1106" if json_mode else "gpt-3.5-turbo", # Use a model that supports JSON mode if needed
        messages=messages,
        max_tokens=max_tokens,
        temperature=0.7, # Slightly lower temperature for more structured output
        response_format=response_format # Specify response format
    )
    return resp.choices[0].message.content.strip()

# --- Core logic functions ---
def propose_ideas(problem: str, n_ideas: int = 5) -> List[str]:
    """
    Generate solution ideas for a given problem.
    """
    system_prompt = (
        f"You are a creative assistant. Given a short problem description, propose {n_ideas} different digital solution ideas."
    )
    user_prompt = f"Problem: {problem}\n\nPropose {n_ideas} solution ideas numbered 1 to {n_ideas}."
    raw = ask_openai(system_prompt, user_prompt)
    lines = [line.strip() for line in raw.splitlines() if line.strip()]
    ideas = []
    for line in lines:
        parts = line.split('.', 1)
        if len(parts) == 2 and parts[0].isdigit():
            ideas.append(parts[1].strip())
        else:
            ideas.append(line)
    return ideas

# New structure for tasks
# This should match the AiTask interface in your frontend
# This is a sample structure, you can modify it as needed.
# The AI needs to be prompted to return this exact format.
# A Pydantic model for validation if you were using FastAPI extensively,
# but for simple jsonify, a dictionary structure is enough if the AI follows it.
# from pydantic import BaseModel
# class AiTask(BaseModel):
#     title: str
#     description: str
#     assignedRole: str
#     priority: str # 'low' | 'medium' | 'high'
#     estimatedDays: int
#     tags: List[str]

# class AiSuggestions(BaseModel):
#     analysis: str
#     tasks: List[AiTask]


def distribute_tasks(idea: str) -> Dict[str, Any]:
    """
    Generate task distribution and analysis based on roles for a chosen idea,
    returning structured JSON.
    """
    roles = load_roles()
    if not roles:
        # Fallback if no roles are loaded, provide default or inform the user.
        # This is a critical point: ensure 'users' table in my_database.db has data.
        print("Warning: No roles loaded from database. Using default roles for task distribution.")
        roles_str = "Project Manager, Software Developer, Data Scientist, UX/UI Designer, Quality Assurance Tester"
    else:
        roles_str = ", ".join(f"{n} ({r})" for n, r in roles.items())

    system_prompt = (
        "You are an expert project manager assistant. Given a solution idea and team roles, "
        "provide a concise overall analysis of the task distribution, and then "
        "generate a list of specific tasks. Each task should include: "
        "a 'title', 'description', 'assignedRole' (from the provided roles), "
        "'priority' (low, medium, or high), 'estimatedDays' (an integer), and 'tags' (a list of relevant keywords)."
        "\n\n"
        "Return the response as a JSON object with two keys: 'analysis' (a string) and 'tasks' (an array of task objects)."
        "\n\n"
        "Available roles: " + roles_str +
        "\n\n"
        "Example format for 'tasks' array:\n"
        "[\n"
        "  {\n"
        "    \"title\": \"Develop User Authentication\",\n"
        "    \"description\": \"Implement user login, registration, and session management.\",\n"
        "    \"assignedRole\": \"Software Developer\",\n"
        "    \"priority\": \"high\",\n"
        "    \"estimatedDays\": 7,\n"
        "    \"tags\": [\"backend\", \"security\"]\n"
        "  }\n"
        "]"
    )
    user_prompt = f"Solution idea: {idea}\n\nGenerate the analysis and task distribution."

    try:
        raw_json_response = ask_openai(system_prompt, user_prompt, max_tokens=1000, json_mode=True)
        # print(f"Raw AI JSON response: {raw_json_response}") # For debugging
        parsed_data = json.loads(raw_json_response)

        # Basic validation of the parsed data structure
        if "analysis" in parsed_data and "tasks" in parsed_data and isinstance(parsed_data["tasks"], list):
            # Further validate tasks if necessary
            validated_tasks = []
            for task in parsed_data["tasks"]:
                # Ensure all required fields are present and have correct types
                if all(k in task for k in ['title', 'description', 'assignedRole', 'priority', 'estimatedDays', 'tags']) \
                   and isinstance(task['title'], str) \
                   and isinstance(task['description'], str) \
                   and isinstance(task['assignedRole'], str) \
                   and task['priority'] in ['low', 'medium', 'high'] \
                   and isinstance(task['estimatedDays'], int) \
                   and isinstance(task['tags'], list):
                    validated_tasks.append(task)
                else:
                    print(f"Warning: Malformed task from AI, skipping: {task}")
            
            return {
                "analysis": parsed_data["analysis"],
                "tasks": validated_tasks
            }
        else:
            print(f"Warning: AI response missing 'analysis' or 'tasks' list. Raw: {raw_json_response}")
            # Fallback for when AI doesn't return the expected structure
            return {
                "analysis": "AI did not provide a structured analysis. Here is the raw response: " + raw_json_response,
                "tasks": []
            }

    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}. Raw response: {raw_json_response}")
        return {
            "analysis": "Failed to parse AI response as JSON. Please try again. Raw AI response: " + raw_json_response,
            "tasks": []
        }
    except Exception as e:
        print(f"An unexpected error occurred during task distribution: {e}")
        return {
            "analysis": "An internal error occurred while generating tasks.",
            "tasks": []
        }

def recommend_resources(idea: str) -> str:
    """
    Recommend literature and other resources for a given solution idea.

    :param idea: A description of the chosen solution idea.
    :return: A string containing recommended resources with active links.
    """
    system_prompt = (
        "You are an assistant that recommends resources. "
        "Based on the chosen solution idea, propose literature and resources "
        "with active links to help implement it."
    )

    user_prompt = (
        f"Solution idea: {idea}\n\n"
        "Propose literature and resources:"
    )

    return ask_openai(system_prompt, user_prompt, max_tokens=400)
