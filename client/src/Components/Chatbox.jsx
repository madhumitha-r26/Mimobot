import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import mimobot from "../assets/mimobot_icon.png"

function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessage("");
    setLoading(true);

    // 1️⃣ Show user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage, time: timestamp },
      { role: "bot", text: "", time: timestamp } // placeholder for streaming
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
          ...updated[updated.length - 1],
          text: botText,
        };
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col max-w-2xl mx-auto p-4">
      {/* CHAT CONTAINER */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin"
      >
        {/* INTRO MESSAGE */}
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-20 rounded-full flex items-center justify-center">
              <img src={mimobot} alt="Mimobot" />
            </div>
          </div>
       
          <div className="bg-base-200 p-4 rounded-lg text-lg text-base-content">
            I am Mimobot. How can I help you?
          </div>
        </div>

        {/* MAPPED MESSAGES */}
      {/* MAPPED MESSAGES */}
{messages.map((msg, index) => (
  <div 
    key={index} 
    className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
  >
    {/* 1. Only render the chat-image if the role is 'bot' */}
    {msg.role === "bot" && (
      <div className="chat-image avatar">
        <div className="w-20"> 
          <img
            alt="Bot Avatar"
            src={mimobot} 
          />
        </div>
      </div>
    )}

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
        
        {loading && (
           <div className="chat chat-start">
             <div className="chat-bubble bg-transparent italic opacity-50 text-xs">
                MIMOBOT is typing...
             </div>
           </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type to chat"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="input input-bordered text-lg w-full focus:outline-none focus:ring-2 focus:ring-info border-2"
        />
        <button
          className="btn btn-info px-6"
          onClick={sendMessage}
          disabled={loading}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;