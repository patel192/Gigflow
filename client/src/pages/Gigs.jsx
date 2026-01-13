import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { Search, ArrowRight, IndianRupee } from "lucide-react";

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
    <div className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 tracking-widest">
            BROWSE GIGS
          </h1>
          <p className="text-zinc-500 mt-2 text-sm md:text-base">
            Discover projects and start earning.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            placeholder="Search gigs by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={fetchGigs}
            className="w-full bg-zinc-950 border border-zinc-800 pl-12 pr-4 py-3 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition"
          />
        </div>

        {/* Gig Cards */}
        {gigs.length === 0 ? (
          <p className="text-zinc-500">No gigs found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl hover:border-yellow-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-bold text-yellow-400 mb-2 line-clamp-2">
                    {gig.title}
                  </h2>

                  <p className="text-zinc-500 text-sm line-clamp-3">
                    {gig.description}
                  </p>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-zinc-400 flex items-center gap-1">
                    <IndianRupee size={14} />
                    {gig.budget}
                  </span>

                  <Link
                    to={`/dashboard/gig/${gig._id}`}
                    className="flex items-center gap-1 text-yellow-400 font-semibold hover:gap-2 transition-all"
                  >
                    View
                    <ArrowRight size={16} />
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
