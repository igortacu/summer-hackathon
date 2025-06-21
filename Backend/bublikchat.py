import os
from dotenv import load_dotenv
from openai import OpenAI

# ———————————————
# 1) Load env & instantiate client
# ———————————————
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("Make sure .env contains OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# ———————————————
# 2) Chat helper
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

# ———————————————
# 3) Main loop
# ———————————————
if __name__ == "__main__":
    print("🚀 Chatbot is running. Type your question or 'exit' to quit.")
    while True:
        user_input = input("Message: ").strip()
        if user_input.lower() in ("exit", "quit"):
            print("👋 Goodbye!")
            break
        try:
            answer = get_answer(user_input)
            print(f"Assistant: {answer}\n")
        except Exception as e:
            print(f"Error: {e}")
            break
