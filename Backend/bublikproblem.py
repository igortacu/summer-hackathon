import os
import sqlite3
from typing import List, Dict
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

# # --- Data models for API ---
# class ProblemRequest(BaseModel):
#     problem: str
#     n_ideas: int = 5

# class IdeaSelection(BaseModel):
#     idea: str



# class TasksResponse(BaseModel):
#     distribution: str

# class ResourcesResponse(BaseModel):
#     resources: str

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


def ask_openai(system_prompt: str, user_prompt: str, max_tokens: int = 300) -> str:
    """
    Send a chat completion request to OpenAI and return the text response.
    """
    resp = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        max_tokens=max_tokens,
        temperature=0.8
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


def distribute_tasks(idea: str) -> str:
    """
    Generate task distribution based on roles for a chosen idea.
    """
    roles = load_roles()
    roles_str = ", ".join(f"{n}: {r}" for n, r in roles.items())
    system_prompt = (
        f"You are a project manager assistant for a team with roles: {roles_str}."
    )
    user_prompt = f"Solution idea: {idea}\n\nPropose task distribution among the team members based on their roles."
    return ask_openai(system_prompt, user_prompt, max_tokens=400)


def recommend_resources(idea: str) -> str:
    """
    Recommend literature and resources for a chosen idea.
    """
    system_prompt = (
        "You are an assistant that recommends resources. Based on the chosen solution idea, propose literature and resources with active links to help implement it."
    )
    user_prompt = f"Solution idea: {idea}\n\nPropose literature and resources:"
    return ask_openai(system_prompt, user_prompt, max_tokens=400)

# --- FastAPI setup ---
# app = FastAPI()

# @app.post("/ideas")
# async def get_ideas(req: ProblemRequest):
#     try:
#         ideas = propose_ideas(req.problem, req.n_ideas)
#         return IdeasResponse(ideas=ideas)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/tasks", response_model=TasksResponse)
# async def get_tasks(sel: IdeaSelection):
#     try:
#         dist = distribute_tasks(sel.idea)
#         return TasksResponse(distribution=dist)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/resources", response_model=ResourcesResponse)
# async def get_resources(sel: IdeaSelection):
#     try:
#         res = recommend_resources(sel.idea)
#         return ResourcesResponse(resources=res)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))