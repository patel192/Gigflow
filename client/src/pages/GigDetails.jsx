import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  IndianRupee,
  FileText,
  Send,
  MessageSquare,
} from "lucide-react";

export default function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gig, setGig] = useState(null);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch gig info
  const fetchGig = async () => {
    try {
      const res = await api.get(`/gigs`);
      const found = res.data.find((g) => g._id === id);
      setGig(found);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load gig");
    }
  };

  useEffect(() => {
    fetchGig();
  }, []);

  // Submit bid
  const submitBid = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/bids", {
        gigId: id,
        message,
        price: Number(price),
      });
      toast.success("Bid submitted successfully");
      setSuccess("Bid submitted successfully.");
      setMessage("");
      setPrice("");
      navigate("/dashboard/gigs");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Failed to submit bid");
        setError("Failed to submit bid.");
      }
    }
  };

  if (!gig) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 grid lg:grid-cols-2 gap-8">

        {/* Gig Info */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-2 text-yellow-400">
            <FileText size={18} />
            <span className="text-sm uppercase tracking-wider">Gig Details</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
            {gig.title}
          </h1>

          <p className="text-zinc-400 leading-relaxed">
            {gig.description}
          </p>

          <div className="flex items-center gap-2 text-zinc-300">
            <IndianRupee size={16} />
            <span className="font-medium">Budget:</span>
            <span className="text-white font-semibold">₹{gig.budget}</span>
          </div>
        </div>

        {/* Bid Form */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 text-yellow-400">
            <Send size={18} />
            <h2 className="text-lg font-bold tracking-wider">
              PLACE YOUR BID
            </h2>
          </div>

          {error && (
            <div className="border border-red-500 text-red-400 px-4 py-2 text-sm rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="border border-green-500 text-green-400 px-4 py-2 text-sm rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={submitBid} className="space-y-5">
            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 flex items-center gap-2">
                <MessageSquare size={14} />
                Message
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain why you're the best fit for this project..."
                className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 flex items-center gap-2">
                <IndianRupee size={14} />
                Your Price
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="4000"
                className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition flex items-center justify-center gap-2"
            >
              SUBMIT BID
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
