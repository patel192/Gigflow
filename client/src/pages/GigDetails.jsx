import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
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
      toast.error(err.response?.data?.message || "Error to Load Gig")
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
        price: Number(price)
      });
      toast.success("Bid Submitted");
      setSuccess("Bid submitted successfully.");
      setMessage("");
      setPrice("");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Failed to post bid, Please try again later")
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
    <div className="min-h-screen bg-black text-white">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* Gig Info */}
        <div className="bg-zinc-900 border border-zinc-800 p-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-4">
            {gig.title}
          </h1>

          <p className="text-zinc-400 mb-6 leading-relaxed">
            {gig.description}
          </p>

          <div className="text-sm text-zinc-500">
            Budget: <span className="text-white font-semibold">₹{gig.budget}</span>
          </div>
        </div>

        {/* Bid Form */}
        <div className="bg-zinc-900 border border-zinc-800 p-8">
          <h2 className="text-xl font-bold text-yellow-400 mb-6">
            PLACE YOUR BID
          </h2>

          {error && (
            <div className="border border-red-500 text-red-400 px-4 py-2 text-sm mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="border border-green-500 text-green-400 px-4 py-2 text-sm mb-4">
              {success}
            </div>
          )}

          <form onSubmit={submitBid} className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain why you're the right freelancer..."
                className="w-full bg-black border border-zinc-700 px-4 py-3 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Your Price (₹)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="4000"
                className="w-full bg-black border border-zinc-700 px-4 py-3 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 hover:bg-yellow-300 transition"
            >
              SUBMIT BID →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
