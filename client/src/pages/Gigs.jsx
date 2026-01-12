import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchGigs = async () => {
    try {
      const res = await api.get(`/gigs?search=${search}`);
      setGigs(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-extrabold text-yellow-400 tracking-widest mb-6">
          BROWSE GIGS
        </h1>

        {/* Search */}
        <input
          placeholder="Search gigs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={fetchGigs}
          className="w-full bg-black border border-zinc-800 px-5 py-3 text-white focus:outline-none focus:border-yellow-400 mb-10"
        />

        {/* Gig Cards */}
        {gigs.length === 0 ? (
          <p className="text-zinc-500">No gigs found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-zinc-900 border border-zinc-800 p-8 hover:border-yellow-400 transition"
              >
                <h2 className="text-xl font-bold text-yellow-400 mb-3">
                  {gig.title}
                </h2>

                <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                  {gig.description}
                </p>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-sm text-zinc-500">
                    Budget: ₹{gig.budget}
                  </span>

                  <Link
                    to={`/dashboard/gig/${gig._id}`}
                    className="text-yellow-400 font-bold hover:underline"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
