import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function MyGigs() {
  const navigate = useNavigate();

  const [myGigs, setMyGigs] = useState([]);
  const [bids, setBids] = useState({});
  const [openGig, setOpenGig] = useState(null);
  const [editingGig, setEditingGig] = useState(null);
  const [deleteGigId, setDeleteGigId] = useState(null);
  const [hireData, setHireData] = useState(null);
  const [error, setError] = useState("");

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    budget: "",
  });

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
      toast.error("Failed to load bids");
    }
  };

  const hireBid = async (bidId, gigId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      toast.success("Freelancer hired successfully");
      fetchMyGigs();
      fetchBids(gigId);
    } catch {
      toast.error("Hiring failed");
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
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-zinc-900 border border-zinc-800 p-8"
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-6">
                <div>
                  <h2 className="text-xl font-bold text-yellow-400">
                    {gig.title}
                  </h2>
                  <p className="text-zinc-500 text-sm">Status: {gig.status}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleGig(gig._id)}
                    className="border border-yellow-400 text-yellow-400 px-4 py-2 hover:bg-yellow-400 hover:text-black transition"
                  >
                    {openGig === gig._id ? "Hide Bids" : "View Bids"}
                  </button>

                  <button
                    onClick={() => {
                      setEditingGig(gig._id);
                      setEditForm({
                        title: gig.title,
                        description: gig.description,
                        budget: gig.budget,
                      });
                    }}
                    className="border border-blue-500 text-blue-400 px-4 py-2 hover:bg-blue-500 hover:text-black transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteGigId(gig._id)}
                    className="border border-red-500 text-red-400 px-4 py-2 hover:bg-red-500 hover:text-black transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Edit Form */}
              {editingGig === gig._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 border border-zinc-800 p-6 space-y-4 bg-black">
                    <input
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 px-4 py-2"
                      placeholder="Title"
                    />

                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 px-4 py-2"
                      rows={3}
                      placeholder="Description"
                    />

                    <input
                      type="number"
                      value={editForm.budget}
                      onChange={(e) =>
                        setEditForm({ ...editForm, budget: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 px-4 py-2"
                      placeholder="Budget"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={async () => {
                          try {
                            await api.patch(`/gigs/${gig._id}`, editForm);
                            toast.success("Gig updated successfully");
                            setEditingGig(null);
                            fetchMyGigs();
                          } catch {
                            toast.error("Update failed");
                          }
                        }}
                        className="bg-yellow-400 text-black px-4 py-2 font-bold hover:bg-yellow-300"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingGig(null)}
                        className="border border-zinc-600 px-4 py-2 hover:bg-zinc-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Bids Section */}
              <AnimatePresence>
                {openGig === gig._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
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
                            initial={{ opacity: 0, y: 8 }}
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
                                onClick={() =>
                                  setHireData({
                                    bidId: bid._id,
                                    gigId: gig._id,
                                  })
                                }
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

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteGigId}
        title="Delete Gig"
        message="Are you sure you want to delete this gig? This action cannot be undone."
        onCancel={() => setDeleteGigId(null)}
        onConfirm={async () => {
          try {
            await api.delete(`/gigs/${deleteGigId}`);
            toast.success("Gig deleted");
            setDeleteGigId(null);
            fetchMyGigs();
          } catch {
            toast.error("Delete failed");
          }
        }}
      />
      <ConfirmModal
        isOpen={!!hireData}
        title="Hire Freelancer"
        message="Are you sure you want to hire this freelancer? This will close the gig and reject all other bids."
        onCancel={() => setHireData(null)}
        onConfirm={async () => {
          try {
            await api.patch(`/bids/${hireData.bidId}/hire`);
            toast.success("Freelancer hired successfully");
            setHireData(null);
            fetchMyGigs();
            fetchBids(hireData.gigId);
          } catch {
            toast.error("Hiring failed");
          }
        }}
      />
    </div>
  );
}
