# bublik.py

import os
from dotenv import load_dotenv
from openai import OpenAI

# 1. Load environment variables from .env
load_dotenv()

# 2. Instantiate the new OpenAI client
client = OpenAI()

def get_ideas_from_text(prompt_text: str, n_ideas: int = 5) -> str:
    """
    Send the user’s text to OpenAI’s chat endpoint and
    return a list of creative ideas.
    """
    resp = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a creative assistant that proposes different ideas based on user input."
            },
            {
                "role": "user",
                "content": (
                    f"Given the following text, propose {n_ideas} different creative ideas:\n\n"
                    f"{prompt_text}"
                )
            }
        ],
        max_tokens=300,
        temperature=0.8
    )
    # Extract and return the assistant’s reply text
    return resp.choices[0].message.content.strip()


if __name__ == "__main__":
    user_text = input("Describe your problem: ")
    ideas = get_ideas_from_text(user_text)
    print("\n=== Creative Ideas ===\n")
    print(ideas)