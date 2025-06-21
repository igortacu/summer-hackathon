# /Backend/bublikchat.py
import os
from dotenv import load_dotenv
from openai import OpenAI

# --- Load env & instantiate client ---
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise RuntimeError("Could not find OPENAI_API_KEY in the .env file. Please make sure it's set correctly in /Backend/.env")

client = OpenAI(api_key=api_key)

# --- Chat helper function ---
def get_answer(question: str) -> str:
    """
    Sends a question to the OpenAI API and returns the assistant's answer.
    """
    system_prompt = (
        "You are a helpful assistant for a project management platform called Bublink. "
        "Answer the user’s question concisely and accurately."
    )
    # This try...except block is very important to prevent server crashes
    try:
        resp = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question}
            ],
            max_tokens=500,
            temperature=0.7
        )
        content = resp.choices[0].message.content
        return content.strip() if content else "I'm sorry, I couldn't generate a response."
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return "Sorry, I encountered an error while contacting the AI."

def init_convo_db():
  # This function is called from your app.py, so we keep it.
  print("Initializing conversation database (if needed)...")
  pass

# The old `if __name__ == "__main__"` block has been removed because it is not needed.