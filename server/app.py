import os
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
from datetime import datetime
from collections import defaultdict

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# In-memory chat history
chat_histories = defaultdict(list)
today = datetime.now().strftime("%A, %B %d, %Y")

SYSTEM_PROMPT = (
    "You are MIMOBOT, an AI assistant. "
    "Answer concisely and clearly. "
    "Expand only if the user explicitly asks for details."
    "Always complete your thoughts before ending a response. "
    "If asked for your name, reply with 'My name is MIMOBOT'."
    f"If today's date asked, reply with 'Today's date is {today}'."
    "Never cut off responses"
)

@app.route('/')
def index():
    return "I AM MIMOBOT"

@app.route("/chat-stream", methods=["POST"])
def chat_stream():
    data = request.get_json()
    user_message = data.get("message", "").strip()
    session_id = data.get("session_id", "default")

    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    def generate():
        try:
            # Build conversation context
            history = chat_histories[session_id]

            prompt = SYSTEM_PROMPT + "\n\n"

            for turn in history:
                prompt += f"User: {turn['user']}\n"
                prompt += f"Assistant: {turn['bot']}\n"

            prompt += f"User: {user_message}\nAssistant:"

            stream = client.models.generate_content_stream(
                model="gemini-3-flash-preview",
                contents=prompt,
                config={
                    "temperature": 0.4,
                    "max_output_tokens": 500,
                }
            )

            full_response = ""

            for chunk in stream:
                if chunk.text:
                    full_response += chunk.text
                    yield chunk.text

            # Save conversation
            history.append({
                "user": user_message,
                "bot": full_response.strip()
            })

        except Exception as e:
            yield "\n\n[Error generating response]"

    return Response(generate(), mimetype="text/plain")

if __name__ == "__main__":
    app.run(debug=True)
