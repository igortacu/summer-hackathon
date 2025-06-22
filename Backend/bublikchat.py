# bublik.py

import os
import sqlite3
from dotenv import load_dotenv
from openai import OpenAI

# ———————————————
# 1) Load env & instantiate client
# ———————————————
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("Make sure .env contains OPENAI_API_KEY=…")
client = OpenAI(api_key=api_key)

# ———————————————
# 2) Paths
# ———————————————
USER_DB_PATH = "my_database.db"  # your existing DB
CONVO_DB_PATH = "bublik_convo.db"  # our chat history

# ———————————————
# 3) Read project + roles from your existing users table
# ———————————————

def get_answer(question: str) -> str:
    """
    Sends the user's question to the OpenAI chat endpoint and returns the assistant's answer.
    """
    system_prompt = (
        "You are a helpful assistant. "
        "Answer the user’s question concisely and accurately."
    )
    resp = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ],
        max_tokens=500,
        temperature=0.7
    )
    return resp.choices[0].message.content.strip()



def load_project_and_roles():
    """
    Connect to your existing `my_database.db` and pull:
      - project_name: assumed identical across all rows
      - roles: dict of {name: role}
    """
    conn = sqlite3.connect(USER_DB_PATH)
    c = conn.cursor()
    c.execute('''
        SELECT name, role, "Project name"
        FROM users
    ''')
    rows = c.fetchall()
    conn.close()
    if not rows:
        raise RuntimeError("No users found in my_database.db → users table is empty.")
    # assume project name is the same on every row:
    project_name = rows[0][2]
    roles = { name: role for name, role, _ in rows }
    return project_name, roles

# ———————————————
# 4) Convo history DB (we keep our own)
# ———————————————
def init_convo_db():
    conn = sqlite3.connect(CONVO_DB_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS convo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            ts DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def add_convo(role: str, content: str):
    conn = sqlite3.connect(CONVO_DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO convo (role, content) VALUES (?, ?)", (role, content))
    conn.commit()
    conn.close()

def load_convo():
    conn = sqlite3.connect(CONVO_DB_PATH)
    c = conn.cursor()
    c.execute("SELECT role, content FROM convo ORDER BY id")
    msgs = [{"role": row[0], "content": row[1]} for row in c.fetchall()]
    conn.close()
    return msgs

# ———————————————
# 5) Chat helper
# ———————————————
def chat_with_context(user_text: str) -> str:
    project_name, roles_dict = load_project_and_roles()
    # turn the dict into a simple "Name: Role, ..." string
    roles_str = ", ".join(f"{n}: {r}" for n, r in roles_dict.items())

    system_msg = {
        "role": "system",
        "content": (
            f"You are a project assistant for '{project_name}'.\n"
            f"Team members & roles: {roles_str}\n\n"
            "When asked for creative ideas, also propose a task repartition "
            "based on roles. Remember the entire conversation."
        )
    }

    history = load_convo()
    history.append({"role": "user", "content": user_text})
    add_convo("user", user_text)

    resp = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[system_msg] + history,
        max_tokens=500,
        temperature=0.8
    )

    assistant_text = resp.choices[0].message.content.strip()
    add_convo("assistant", assistant_text)
    return assistant_text

# ———————————————
# 6) Main loop
# ———————————————
if __name__ == "__main__":
    init_convo_db()

    print("🚀 Describe your next task, or type 'exit' to quit.")
    while True:
        user_text = input("\nMessage: ").strip()
        if user_text.lower() in ("exit", "quit"):
            print("👋 Goodbye!")
            break

        try:
            reply = chat_with_context(user_text)
            print("\n🤖 Assistant:\n")
            print(reply)
        except Exception as e:
            print("❌ Error:", e)
            break
