import React, { useState, useEffect } from "react";
import Footer from "@/Base/Footer";
import Navbar from "@/Base/Navbar";
import "./home.css";
import apiService from "@/utils/api";

function Home() {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  // Fetch rooms helper
  const fetchRooms = () => {
    apiService
      .get("/hangout/home/")
      .then((data) => setRooms(data.rooms || []))
      .catch((err) => console.error(err));
  };

  // Fetch on mount, after login, and on window focus
  useEffect(() => {
    fetchRooms();
    const onAuthLogin = () => fetchRooms();
    const onAuthLogout = () => setRooms([]);
    const onFocus = () => fetchRooms();
    window.addEventListener("auth:login", onAuthLogin);
    window.addEventListener("auth:logout", onAuthLogout);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("auth:login", onAuthLogin);
      window.removeEventListener("auth:logout", onAuthLogout);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // Create room
  const handleCreateRoom = (e) => {
    e.preventDefault();
    setError("");

    apiService
      .post("/hangout/create-room/", { room_name: roomName })
      .then((data) => {
        setRooms((prev) => [...prev, data]);
        setRoomName("");
      })
      .catch((err) => {
        if (/401/.test(err.message)) {
          setError("You must be logged in.");
        } else if (/404/.test(err.message)) {
          setError("Endpoint not found. Is the backend running on 8000?");
        } else {
          setError(err.message);
        }
      });
  };

  // Delete room
  const handleDeleteRoom = (token) => {
    apiService
      .post("/hangout/delete-room/", { room_token: token })
      .then(() => {
        setRooms((prev) => prev.filter((room) => room.room_token !== token));
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete room.");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="hangout-body">
        <div className="room-modal">
          <form className="form" onSubmit={handleCreateRoom}>
            <h2>Create Room</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
              type="text"
              name="roomName"
              placeholder="HangOut Room Name..."
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button type="submit">Create</button>
          </form>
        </div>

        <div
          className="room-modal"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <table className="rooms-table">
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Token</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <tr key={room.room_token}>
                    <td>{room.room_name}</td>
                    <td
                      className="token-cell"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigator.clipboard
                          .writeText(room.room_token)
                          .then(() => alert("Token copied to clipboard!"))
                          .catch(() => alert("Failed to copy token."));
                      }}
                    >
                      {room.room_token}
                    </td>
                    <td>
                      <a
                        className="jump-to-btn"
                        href={`/hangout/room/${room.room_token}`}
                      >
                        Jump To
                      </a>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteRoom(room.room_token)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    style={{ textAlign: "center", color: "#ccc" }}
                  >
                    No rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="hangout-shader"></div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
