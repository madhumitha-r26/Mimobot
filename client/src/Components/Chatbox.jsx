<<<<<<< HEAD
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage("");
    setLoading(true);

    // 1️⃣ Show user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "bot", text: "" } // placeholder for streaming
    ]);

    const response = await fetch("https://mimobot.vercel.app/chat-stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let botText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      botText += chunk;

      // 2️⃣ Stream into last bot message
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "bot",
          text: botText,
        };
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 p-4">

          {/* INTRO */}
          <div className="flex">
            <p className="text-5xl py-2">🤖</p>
            <div className="p-4 bg-base-200 rounded-lg text-lg">
              I am Mimobot. How can I help you?
            </div>
          </div>

          {/* CHAT MESSAGES */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "bot" && <p className="text-5xl py-2">🤖</p>}
              <div
                className={`p-4 rounded-lg text-lg whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-cyan-600 text-white"
                    : "bg-base-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* TYPING */}
          {loading && (
            <div className="text-sm opacity-60">MIMOBOT is typing...</div>
          )}

          {/* INPUT */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type to chat"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="input input-bordered text-xl p-6 w-full h-10 min-h-full focus:outline-none focus:ring-0 border-2"
            />
            <button
              className="btn btn-info h-10 p-6"
              onClick={sendMessage}
              disabled={loading}
            >
              <SendIcon />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatBox;
=======
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage("");
    setLoading(true);

    // 1️⃣ Show user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "bot", text: "" } // placeholder for streaming
    ]);

    const response = await fetch("https://mimobot.vercel.app/chat-stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let botText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      botText += chunk;

      // 2️⃣ Stream into last bot message
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "bot",
          text: botText,
        };
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 p-4">

          {/* INTRO */}
          <div className="flex">
            <p className="text-5xl py-2">🤖</p>
            <div className="p-4 bg-base-200 rounded-lg text-lg">
              I am Mimobot. How can I help you?
            </div>
          </div>

          {/* CHAT MESSAGES */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "bot" && <p className="text-5xl py-2">🤖</p>}
              <div
                className={`p-4 rounded-lg text-lg whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-cyan-600 text-white"
                    : "bg-base-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* TYPING */}
          {loading && (
            <div className="text-sm opacity-60">MIMOBOT is typing...</div>
          )}

          {/* INPUT */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type to chat"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="input input-bordered text-xl p-6 w-full h-10 min-h-full focus:outline-none focus:ring-0 border-2"
            />
            <button
              className="btn btn-info h-10 p-6"
              onClick={sendMessage}
              disabled={loading}
            >
              <SendIcon />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatBox;
>>>>>>> 198c2a5849c1aaec7df1b80638f3ff7e5fdd49bf
