import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

export default function MyGigs() {
  const navigate = useNavigate();

  const [myGigs, setMyGigs] = useState([]);
  const [bids, setBids] = useState({});
  const [openGig, setOpenGig] = useState(null);
  const [error, setError] = useState("");

  const fetchMyGigs = async () => {
    try {
      const res = await api.get("/gigs/my");
      setMyGigs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      else setError("Failed to load gigs.");
    }
  };

  const fetchBids = async (gigId) => {
    try {
      const res = await api.get(`/bids/${gigId}`);
      setBids((prev) => ({ ...prev, [gigId]: res.data }));
    } catch {
      setError("Failed to load bids.");
    }
  };

  const hireBid = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      alert("Freelancer hired successfully.");
      fetchMyGigs();
    } catch {
      setError("Hiring failed.");
    }
  };

  useEffect(() => {
    fetchMyGigs();
  }, []);

  const toggleGig = (gigId) => {
    if (openGig === gigId) {
      setOpenGig(null);
    } else {
      setOpenGig(gigId);
      if (!bids[gigId]) fetchBids(gigId);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-yellow-400 tracking-widest mb-10">
        MY GIGS
      </h1>

      {error && (
        <div className="border border-red-500 text-red-400 px-4 py-2 mb-6">
          {error}
        </div>
      )}

      {myGigs.length === 0 ? (
        <p className="text-zinc-500">You haven't posted any gigs yet.</p>
      ) : (
        <div className="space-y-8">
          {myGigs.map((gig) => (
            <motion.div
              key={gig._id}
              layout
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-zinc-900 border border-zinc-800 p-8"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-yellow-400">
                    {gig.title}
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    Status: {gig.status}
                  </p>
                </div>

                <button
                  onClick={() => toggleGig(gig._id)}
                  className="border border-yellow-400 text-yellow-400 px-4 py-2 hover:bg-yellow-400 hover:text-black transition"
                >
                  {openGig === gig._id ? "Hide Bids" : "View Bids"}
                </button>
              </div>

              {/* Animated Bids */}
              <AnimatePresence>
                {openGig === gig._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 space-y-4">
                      {!bids[gig._id] ? (
                        <p className="text-zinc-500 text-sm">Loading bids...</p>
                      ) : bids[gig._id].length === 0 ? (
                        <p className="text-zinc-500 text-sm">No bids yet.</p>
                      ) : (
                        bids[gig._id].map((bid) => (
                          <motion.div
                            key={bid._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border border-zinc-800 p-5 flex justify-between items-center"
                          >
                            <div>
                              <p className="text-sm text-zinc-400">
                                {bid.freelancerId?.name || "Freelancer"}
                              </p>
                              <p className="text-white">{bid.message}</p>
                              <p className="text-zinc-500 text-sm">
                                ₹{bid.price} — {bid.status}
                              </p>
                            </div>

                            {bid.status === "pending" && (
                              <button
                                onClick={() => hireBid(bid._id)}
                                className="bg-yellow-400 text-black font-bold px-4 py-2 hover:bg-yellow-300"
                              >
                                HIRE
                              </button>
                            )}
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
