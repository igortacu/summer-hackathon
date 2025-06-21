import os
import sqlite3
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables and instantiate OpenAI client
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("Make sure .env contains OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# Path to your existing user database
db_path = "my_database.db"

# Helper to load team roles from the database
def load_roles():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('SELECT name, role FROM users')
    rows = cursor.fetchall()
    conn.close()
    return {name: role for name, role in rows}

# Function to query OpenAI ChatCompletion
def ask_openai(system_prompt, user_prompt, max_tokens=300):
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

# Main interaction loop
def main():
    roles = load_roles()
    roles_str = ", ".join(f"{n}: {r}" for n, r in roles.items())
    print("Welcome! Describe your problem, and I'll propose some solution ideas.")

    # Step 1: User describes problem
    problem = input("\nDescribe your problem: ").strip()

    # Step 2: Ask AI for solution ideas
    sys_prompt1 = (
        "You are a creative assistant. "
        "Given a short problem description, propose 5 different digital solution ideas."
    )
    user_prompt1 = f"Problem: {problem}\n\nPropose 5 solution ideas numbered 1 to 5."
    ideas_text = ask_openai(sys_prompt1, user_prompt1)
    print("\nHere are 5 ideas:")
    print(ideas_text)

    # Ask user to select or skip
    choice = input("\nSelect an idea (1-5) or 0 to enter your own idea: ").strip()
    try:
        choice_idx = int(choice)
    except ValueError:
        choice_idx = -1

    if 1 <= choice_idx <= 5:
        # Extract the chosen idea line
        selected_idea = ideas_text.splitlines()[choice_idx - 1]
        print(f"\nYou selected: {selected_idea}")
    else:
        selected_idea = input("\nEnter your custom idea: ").strip()
        print(f"\nYou entered: {selected_idea}")

    # Step 3: Ask AI for task distribution based on roles
    sys_prompt2 = (
        f"You are a project manager assistant for a team with roles: {roles_str}. "
        "Given the chosen solution idea, propose a task distribution among the team members based on their roles."
    )
    user_prompt2 = f"Solution idea: {selected_idea}\n\nPropose task distribution:"
    tasks_text = ask_openai(sys_prompt2, user_prompt2, max_tokens=400)
    print("\n=== Task Distribution Suggestions ===")
    print(tasks_text)

if __name__ == "__main__":
    main()
