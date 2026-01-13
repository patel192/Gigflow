import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
import api from "../api/axios";
import {
  Eye,
  Pencil,
  Trash2,
  UserCheck,
  IndianRupee,
  Mail,
  MessageSquare,
  Save,
  X,
} from "lucide-react";

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

  useEffect(() => {
    fetchMyGigs();
  }, []);

  const toggleGig = (gigId) => {
    if (openGig === gigId) setOpenGig(null);
    else {
      setOpenGig(gigId);
      if (!bids[gigId]) fetchBids(gigId);
    }
  };

  const getHiredBid = (gigId) =>
    bids[gigId]?.find((b) => b.status === "hired");

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-yellow-400 tracking-widest mb-8">
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
        <div className="space-y-6">
          {myGigs.map((gig) => (
            <motion.div
              key={gig._id}
              layout
              className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 md:p-7"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-yellow-400">
                    {gig.title}
                  </h2>
                  <span className="text-xs text-zinc-500 uppercase">
                    Status: {gig.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleGig(gig._id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition
                      ${
                        gig.status === "assigned"
                          ? "border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
                          : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                      }`}
                  >
                    <Eye size={16} />
                    {openGig === gig._id
                      ? "Hide"
                      : gig.status === "assigned"
                      ? "Freelancer"
                      : "Bids"}
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
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-black transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteGigId(gig._id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-black transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>

              {/* Edit Form */}
              <AnimatePresence>
                {editingGig === gig._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 bg-black border border-zinc-800 p-5 rounded-xl space-y-4">
                      <input
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="w-full bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg"
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
                        className="w-full bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg"
                        rows={3}
                        placeholder="Description"
                      />

                      <input
                        type="number"
                        value={editForm.budget}
                        onChange={(e) =>
                          setEditForm({ ...editForm, budget: e.target.value })
                        }
                        className="w-full bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg"
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
                          className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold"
                        >
                          <Save size={16} />
                          Save
                        </button>

                        <button
                          onClick={() => setEditingGig(null)}
                          className="flex items-center gap-2 border border-zinc-600 px-4 py-2 rounded-lg"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bids / Hired Section */}
              <AnimatePresence>
                {openGig === gig._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 space-y-4">
                      {!bids[gig._id] ? (
                        <p className="text-zinc-500">Loading...</p>
                      ) : gig.status === "assigned" ? (
                        (() => {
                          const hired = getHiredBid(gig._id);
                          if (!hired)
                            return (
                              <p className="text-zinc-500">
                                No hired freelancer found.
                              </p>
                            );

                          return (
                            <div className="border border-green-600 bg-black p-6 rounded-xl space-y-3">
                              <p className="text-green-400 font-bold flex items-center gap-2">
                                <UserCheck size={18} /> HIRED FREELANCER
                              </p>
                              <p>{hired.freelancerId?.name}</p>
                              <p className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail size={14} />
                                {hired.freelancerId?.email}
                              </p>
                              <p className="text-sm text-zinc-400 flex items-center gap-2">
                                <IndianRupee size={14} />
                                {hired.price}
                              </p>
                              <p className="text-sm text-zinc-500 flex items-center gap-2">
                                <MessageSquare size={14} />
                                {hired.message}
                              </p>
                            </div>
                          );
                        })()
                      ) : bids[gig._id].length === 0 ? (
                        <p className="text-zinc-500">No bids yet.</p>
                      ) : (
                        bids[gig._id].map((bid) => (
                          <div
                            key={bid._id}
                            className="border border-zinc-800 bg-black p-4 rounded-xl flex flex-col md:flex-row justify-between gap-4"
                          >
                            <div>
                              <p className="text-zinc-300 font-medium">
                                {bid.freelancerId?.name}
                              </p>
                              <p className="text-zinc-500 text-sm">
                                {bid.message}
                              </p>
                              <p className="text-xs text-zinc-600">
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
                                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-300"
                              >
                                HIRE
                              </button>
                            )}
                          </div>
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

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteGigId}
        title="Delete Gig"
        message="Are you sure you want to delete this gig?"
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

      {/* Hire Modal */}
      <ConfirmModal
        isOpen={!!hireData}
        title="Hire Freelancer"
        message="This will close the gig and reject other bids. Continue?"
        onCancel={() => setHireData(null)}
        onConfirm={async () => {
          try {
            await api.patch(`/bids/${hireData.bidId}/hire`);
            toast.success("Freelancer hired");
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
