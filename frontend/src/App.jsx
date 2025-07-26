import { Routes, Route } from "react-router-dom";
import Home  from "@/SmallJobsHome/home/Home";
import Catalog from "@/SmallJobsHome/catalog/Catalog";


function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
    </Routes>
  );
}

export default App;
