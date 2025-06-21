import os
import sqlite3
import json
import re # NEW: Import the re module for regular expressions
from typing import List, Dict, Any
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables and instantiate client
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# --- DEBUGGING START ---
print(f"DEBUG: OPENAI_API_KEY loaded: {'*****' if api_key else 'None'}")
if not api_key:
    print("DEBUG: WARNING: OPENAI_API_KEY not found. OpenAI calls will fail.")
    client = None
else:
    client = OpenAI(api_key=api_key)
# --- DEBUGGING END ---

# Path to your existing user database
db_path = "my_database.db"

# --- Helper functions ---
def load_roles() -> Dict[str, str]:
    conn = None
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT name, role FROM users')
        rows = cursor.fetchall()
        return {name: role for name, role in rows}
    except sqlite3.Error as e:
        print(f"DEBUG: Database error in load_roles: {e}")
        return {}
    finally:
        if conn:
            conn.close()


def ask_openai(system_prompt: str, user_prompt: str, max_tokens: int = 300) -> str:
    if not client:
        print("DEBUG: OpenAI client not initialized (API key missing or other error). Skipping API call.")
        return ""

    try:
        print("DEBUG: Calling OpenAI API...")
        print(f"DEBUG: System Prompt: {system_prompt[:100]}...")
        print(f"DEBUG: User Prompt: {user_prompt[:100]}...")

        resp = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=max_tokens,
            temperature=0.8
        )
        raw_openai_response = resp.choices[0].message.content.strip()
        print(f"DEBUG: Raw OpenAI response (first 200 chars): {raw_openai_response[:200]}...")
        return raw_openai_response
    except Exception as e:
        print(f"DEBUG: Error calling OpenAI API: {e}")
        return ""

# --- Core logic functions ---
def propose_ideas(problem: str, n_ideas: int = 5) -> List[str]:
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


def distribute_tasks(idea: str) -> str:
    roles = load_roles()
    roles_str = ", ".join(f"{n}: {r}" for n, r in roles.items())
    if not roles_str:
        roles_str = "no specific roles defined in the database."

    system_prompt = (
        f"You are a project manager assistant for a team with roles: {roles_str}."
    )
    user_prompt = f"Solution idea: {idea}\n\nPropose task distribution among the team members based on their roles."
    return ask_openai(system_prompt, user_prompt, max_tokens=400)


def get_resources(idea: str) -> List[Dict[str, str]]:
    system_prompt = (
        "You are an assistant that recommends resources. Based on the chosen solution idea, "
        "propose relevant literature and resources. Respond ONLY in JSON format as a list of "
        "objects. Each object MUST have 'title' (string), 'link' (string, a valid URL, ensure it starts with http:// or https://), "
        "and 'description' (string) fields. If no resources are applicable or found, return an empty JSON list []."
        "Example of desired output:\n"
        "[\n"
        "  {\"title\": \"Book Title Example\", \"link\": \"https://example.com/book\", \"description\": \"Summary of the book.\"},\n"
        "  {\"title\": \"Article Name Example\", \"link\": \"https://example.org/article\", \"description\": \"Summary of the article.\"}\n"
        "]"
    )
    user_prompt = f"Solution idea: {idea}\n\nPropose literature and resources:"

    json_string_from_openai = ask_openai(system_prompt, user_prompt, max_tokens=1000)

    print(f"DEBUG: get_resources - JSON string from OpenAI (before fix): {json_string_from_openai[:500]}...")

    if not json_string_from_openai:
        print("DEBUG: OpenAI returned an empty response for resources.")
        return []

    # NEW: Replace single quotes around property names with double quotes
    # This regex looks for:
    # (?:^|[{,]\s*) - Start of string OR after { or , followed by optional spaces
    # ('[^']+')    - A single-quoted string (the key)
    # (\s*:)       - Optional spaces followed by a colon
    try:
        # This regex replaces single quotes around keys with double quotes.
        # It's a common workaround for LLMs that sometimes output single-quoted JSON.
        # It doesn't handle single quotes within values correctly, but LLMs usually
        # escape those if generating valid JSON.
        corrected_json_string = re.sub(r"([{,]\s*)'([^']+)'(\s*:)", r'\1"\2"\3', json_string_from_openai)
        
        print(f"DEBUG: get_resources - JSON string after quote fix: {corrected_json_string[:500]}...")

        parsed_resources: List[Dict[str, str]] = json.loads(corrected_json_string)

        if isinstance(parsed_resources, list):
            validated_resources = []
            for item in parsed_resources:
                if (isinstance(item, dict) and
                    'title' in item and isinstance(item['title'], str) and
                    'link' in item and isinstance(item['link'], str) and
                    'description' in item and isinstance(item['description'], str)):
                    validated_resources.append(item)
                else:
                    print(f"DEBUG: Warning: OpenAI returned an invalid resource item structure. Skipping: {item}")
            print(f"DEBUG: Successfully parsed and validated {len(validated_resources)} resources.")
            return validated_resources
        else:
            print(f"DEBUG: Warning: OpenAI did not return a JSON list for resources. Raw response: {corrected_json_string}")
            return []
    except json.JSONDecodeError as e:
        print(f"DEBUG: Error decoding JSON from OpenAI response (after fix): {e}")
        print(f"DEBUG: Raw OpenAI response that caused error: '{json_string_from_openai}'")
        print(f"DEBUG: Corrected JSON string that failed: '{corrected_json_string}'") # Print corrected string for more insight
        return []
    except Exception as e:
        print(f"DEBUG: An unexpected error occurred while processing OpenAI response: {e}")
        return []
