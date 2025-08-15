import React, { useState, useEffect } from "react";
import Footer from "@/Base/Footer";
import Navbar from "@/Base/Navbar";
import "./room.css";
import apiService from "@/utils/api";
import { useParams } from "react-router-dom";


function Room() {
    const { room_token } = useParams();
    
    return (
        <div>
            <div className="room-body">
                <div className="room-container">
                    <h1>Room ID: {room_token}</h1>
                </div>
            </div>
        </div>
    )
}

export default Room;