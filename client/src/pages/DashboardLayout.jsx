import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-zinc-800">
        <Link to="/" className="text-2xl font-extrabold text-yellow-400 tracking-widest">
          GIGFLOW_
        </Link>

        <div className="flex gap-6 text-sm uppercase tracking-wider">
          <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
          <Link to="/dashboard/gigs" className="hover:text-yellow-400">Gigs</Link>
          <Link to="/dashboard/create-gig" className="hover:text-yellow-400">Post Gig</Link>
          <Link to="/dashboard/bids" className="hover:text-yellow-400">Bids</Link>
        </div>
      </nav>

      {/* Child pages render here */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Outlet />
      </div>
    </div>
  );
}
