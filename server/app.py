import os
from dotenv import load_dotenv
from google import genai
from datetime import datetime

load_dotenv()

def generate():
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    SYSTEM_PROMPT = (
        "You are a knowledgeable chatbot named MIMOBOT. "
        "Answer user questions fully and clearly. "
        "Give detailed explanations for why and how questions. "
        "Give short answers only for simple factual questions. "
        "Use examples if they help understanding. "
        "If a question is unclear, ask for clarification. "
        "Only say 'I don't know what you are asking for' "
        "if the question is completely unrelated or meaningless. "
        "If asked for your name, reply with 'MIMOBOT'."
    )

    chat = client.chats.create(
        model="gemini-3-flash-preview",   
        config={
            "temperature": 0.6,
            "max_output_tokens": 1000,
            "top_p": 0.95,
            "system_instruction": SYSTEM_PROMPT
        }
    )

    print("\t--- MIMOBOT --- \t")
    print("Type 'exit' or 'quit' to end the conversation.")
    print("🤖: Hello, How can I help you?\n")

    while True:
        user_input = input("You: ").strip()

        if not user_input:
            print("🤖: Please ask something.\n")
            continue

        if user_input.lower() in ["exit", "quit"]:
            print("🤖: Goodbye 👋")
            break

        if "today" in user_input.lower() and "date" in user_input.lower():
            today = datetime.now().strftime("%A, %B %d, %Y")
            print(f"🤖: Today is {today}\n")
            continue

        response = chat.send_message(user_input)

        if not response.text or response.text.strip() == "":
            print("🤖: I don't know what you are asking for\n")
        else:
            print(f"🤖: {response.text}\n")

if __name__ == "__main__":
    generate()
