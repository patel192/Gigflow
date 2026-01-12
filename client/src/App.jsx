import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Gigs from "./pages/Gigs";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/gigs" element={<Gigs />}></Route>
    </Routes>
  );
}

export default App;
