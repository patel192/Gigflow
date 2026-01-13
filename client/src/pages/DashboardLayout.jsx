import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  PlusSquare,
  Gavel,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm uppercase tracking-wider
    ${
      isActive
        ? "bg-yellow-400 text-black font-bold"
        : "text-zinc-300 hover:bg-zinc-900 hover:text-yellow-400"
    }`;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black border-b border-zinc-800">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-extrabold text-yellow-400 tracking-widest"
          >
            GIGFLOW_
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-2">
            <NavLink to="/dashboard" end className={linkClass}>
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>

            <NavLink to="/dashboard/gigs" className={linkClass}>
              <Briefcase size={16} />
              Gigs
            </NavLink>

            <NavLink to="/dashboard/create-gig" className={linkClass}>
              <PlusSquare size={16} />
              Post Gig
            </NavLink>

            <NavLink to="/dashboard/bids" className={linkClass}>
              <Gavel size={16} />
              Bids
            </NavLink>
          </div>

          {/* Right side (desktop) */}
          {user && (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-zinc-400 text-sm">
                Hi, <span className="text-white font-medium">{user.name}</span>
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border border-red-500 text-red-400 px-4 py-2 text-sm rounded-lg hover:bg-red-500 hover:text-black transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-zinc-300"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-zinc-800 bg-black px-6 py-4 space-y-2">
            <NavLink
              onClick={() => setOpen(false)}
              to="/dashboard"
              end
              className={linkClass}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              to="/dashboard/gigs"
              className={linkClass}
            >
              <Briefcase size={16} />
              Gigs
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              to="/dashboard/create-gig"
              className={linkClass}
            >
              <PlusSquare size={16} />
              Post Gig
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              to="/dashboard/bids"
              className={linkClass}
            >
              <Gavel size={16} />
              Bids
            </NavLink>

            {user && (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-2 border border-red-500 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-black transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
