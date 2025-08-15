import { Routes, Route } from "react-router-dom";
import Home from "@/SmallJobsHome/home/Home";
import Catalog from "@/SmallJobsHome/catalog/Catalog";
import HangOutHome from "@/HangOut/home/Home";
import Room from "@/HangOut/room/Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/hangout/home" element={<HangOutHome />} />
      <Route path="/hangout/room/:room_token" element={<Room />} />
    </Routes>
  );
}

export default App;
