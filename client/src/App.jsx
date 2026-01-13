import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";
import GigDetails from "./pages/GigDetails";
import DashboardLayout from "./pages/DashboardLayout";
import MyBids  from "./pages/Mybids";
import MyGigs  from "./pages/MyGigs";
import HiredProject from "./pages/HiredProject";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        
        <Route index element={<MyGigs />}></Route>
        <Route path="gigs" element={<Gigs />}></Route>
        <Route path="create-gig" element={<CreateGig />}></Route>
        <Route path="gig/:id" element={<GigDetails />}></Route>
        <Route path="bids" element={<MyBids />}></Route>
        <Route path="hired/:gigId" element={<HiredProject />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
