import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
      : "hover:text-yellow-400 transition";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-zinc-800">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold text-yellow-400 tracking-widest"
        >
          GIGFLOW_
        </NavLink>

        {/* Center Links */}
        <div className="flex gap-6 text-sm uppercase tracking-wider">
          <NavLink to="/dashboard" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/gigs" className={linkClass}>
            Gigs
          </NavLink>

          <NavLink to="/dashboard/create-gig" className={linkClass}>
            Post Gig
          </NavLink>

          <NavLink to="/dashboard/bids" className={linkClass}>
            Bids
          </NavLink>
        </div>

        {/* Right Side */}
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 text-sm">
              Hi, {user.name}
            </span>

            <button
              onClick={() => {
                logout();
                toast.success("Logged out successfully");
                navigate("/login");
              }}
              className="border border-red-500 text-red-400 px-4 py-2 text-sm hover:bg-red-500 hover:text-black transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Child pages */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Outlet />
      </div>
    </div>
  );
}
