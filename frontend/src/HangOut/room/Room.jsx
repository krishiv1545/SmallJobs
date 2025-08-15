import React, { useState, useEffect, useRef } from "react";
import "./room.css";
import { useParams } from "react-router-dom";

function Room() {
  const { room_token } = useParams();
  // Chatbot state
  const [cbInput, setCbInput] = useState("");
  const [cbMessages, setCbMessages] = useState(() => [
    {
      id: String(Date.now()),
      sender: "bot",
      text: "Welcome to the room chat. Say hi!",
      ts: Date.now(),
    },
  ]);
  const cbListRef = useRef(null);

  useEffect(() => {
    if (cbListRef.current) {
      cbListRef.current.scrollTop = cbListRef.current.scrollHeight;
    }
  }, [cbMessages]);

  function handleSend() {
    const text = cbInput.trim();
    if (!text) return;
    const userMsg = {
      id: String(Date.now()) + "u",
      sender: "me",
      text,
      ts: Date.now(),
    };
    setCbMessages((prev) => [...prev, userMsg]);
    setCbInput("");
    // Demo echo reply
    setTimeout(() => {
      setCbMessages((prev) => [
        ...prev,
        {
          id: String(Date.now()) + "b",
          sender: "bot",
          text: "(demo) " + text,
          ts: Date.now(),
        },
      ]);
    }, 300);
  }

  function onCbKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div>
      <div className="room-body">
        <div className="room-container">
          <h1>Room ID: {room_token}</h1>
        </div>

        {/* Right-docked glassmorphic chatbot */}
        <aside className="cb-pane">
        <div className="cb-header">
            HangOut
        </div>

          <div
            ref={cbListRef}
            className="cb-messages"
            role="log"
            aria-live="polite"
          >
            {cbMessages.map((m) => (
              <div
                key={m.id}
                className={`cb-row ${m.sender === "me" ? "out" : "in"}`}
              >
                <div className="cb-bubble">
                  <p className="cb-text">{m.text}</p>
                  {/* <span className="cb-time">
                    {new Date(m.ts).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span> */}
                </div>
              </div>
            ))}
          </div>

          <div className="cb-compose">
            <textarea
              className="cb-input"
              placeholder="Type a message..."
              value={cbInput}
              onChange={(e) => setCbInput(e.target.value)}
              onKeyDown={onCbKeyDown}
              rows={1}
            />
            <button className="cb-send" onClick={handleSend}>
              Send
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Room;
