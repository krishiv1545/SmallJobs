import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import wsService from "@/utils/ws";
import apiService from "@/utils/api";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import "./room.css";

function Room() {
  const { room_token } = useParams();
  const [cbInput, setCbInput] = useState("");
  const [cbMessages, setCbMessages] = useState([]);
  const [showPicker, setShowPicker] = useState(false); // New state for emoji picker
  const cbListRef = useRef(null);
  const socketRef = useRef(null);
  const myChannelNameRef = useRef(null);
  const myUserIdRef = useRef(null);

  // Auth protect
  useEffect(() => {
    (async () => {
      try {
        await apiService.get("/auth/me");
      } catch (e) {
        window.location.href = "/catalog";
      }
    })();
  }, []);

  // Validate room then connect WebSocket
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await apiService.get(`/hangout/room/validate/${room_token}/`);
      } catch (e) {
        window.location.href = "/hangout/home";
        return;
      }
      if (cancelled) return;
      const socket = wsService.connect(`/room/${room_token}/`);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("✅ WebSocket connected");
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === "connection_established") {
            if (data.channel_name) myChannelNameRef.current = data.channel_name;
            if (data.user_id) myUserIdRef.current = data.user_id;
            return;
          }

          if (data.type === "chat_history" && Array.isArray(data.messages)) {
            const history = data.messages.map((m, idx) => ({
              id: `${idx}-${m.timestamp}`,
              sender:
                myUserIdRef.current && m.sender_id === myUserIdRef.current
                  ? "me"
                  : "peer",
              text: m.message,
              ts: Date.parse(m.timestamp) || Date.now(),
            }));
            setCbMessages(history);
            return;
          }

          if (data.type === "chat_message") {
            if (
              data.sender_channel_name &&
              data.sender_channel_name === myChannelNameRef.current
            ) {
              return;
            }
            const isMe =
              myUserIdRef.current && data.sender_id === myUserIdRef.current;
            setCbMessages((prev) => [
              ...prev,
              {
                id: Date.now(),
                sender: isMe ? "me" : "peer",
                text: data.message,
                ts: Date.now(),
              },
            ]);
            return;
          }
        } catch (err) {
          console.error("Invalid WebSocket message:", event.data, err);
        }
      };

      socket.onclose = () => {
        console.warn("❌ WebSocket closed unexpectedly");
      };
    })();

    return () => {
      cancelled = true;
      if (socketRef.current) {
        socketRef.current.close();
        console.log("🔌 WebSocket disconnected");
      }
    };
  }, [room_token]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (cbListRef.current) {
      cbListRef.current.scrollTop = cbListRef.current.scrollHeight;
    }
  }, [cbMessages]);

  function handleSend() {
    const text = cbInput.trim();
    if (!text || !socketRef.current) return;

    setCbMessages((prev) => [
      ...prev,
      { id: Date.now() + "u", sender: "me", text, ts: Date.now() },
    ]);

    socketRef.current.send(JSON.stringify({ message: text }));
    setCbInput("");
    setShowPicker(false); // Close picker after sending
  }

  function onEmojiClick(emojiObject) {
    setCbInput((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false); // Close picker after selection
  }

  function onCbKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function toggleEmojiPicker() {
    setShowPicker((prev) => !prev);
  }

  return (
    <div>
      <div className="room-body">
        <div className="room-container">
          <h1>Room ID: {room_token}</h1>
        </div>

        <aside className="cb-pane">
          <div className="cb-header">HangOut</div>

          <div ref={cbListRef} className="cb-messages" role="log">
            {cbMessages.map((m) => (
              <div
                key={m.id}
                className={`cb-row ${m.sender === "me" ? "out" : "in"}`}
              >
                <div className="cb-bubble">
                  <p className="cb-text">{m.text}</p>
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
            <button className="emoji-button" onClick={toggleEmojiPicker}>
              <FontAwesomeIcon icon={faFaceSmile} />
            </button>
            <button className="cb-send" onClick={handleSend}>
              Send
            </button>
            {showPicker && (
              <div className="emoji-picker-container">
                <EmojiPicker onEmojiClick={onEmojiClick} width="100%" />
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Room;
