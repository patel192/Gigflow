import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function MyBids() {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [error, setError] = useState("");

  const fetchMyBids = async () => {
    try {
      const res = await api.get("/bids/my");
      setBids(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to load your bids.");
      }
    }
  };

  useEffect(() => {
    fetchMyBids();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-yellow-400 tracking-widest mb-10">
        MY BIDS
      </h1>

      {error && (
        <div className="border border-red-500 text-red-400 px-4 py-2 mb-6">
          {error}
        </div>
      )}

      {bids.length === 0 ? (
        <p className="text-zinc-500">You have not submitted any bids yet.</p>
      ) : (
        <div className="space-y-6">
          {bids.map((bid) => (
            <div
              key={bid._id}
              className="bg-zinc-900 border border-zinc-800 p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-lg font-bold text-yellow-400">
                    {bid.gigId?.title || "Gig"}
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    Budget: ₹{bid.gigId?.budget}
                  </p>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 border ${
                    bid.status === "hired"
                      ? "border-green-500 text-green-400"
                      : bid.status === "rejected"
                      ? "border-red-500 text-red-400"
                      : "border-yellow-400 text-yellow-400"
                  }`}
                >
                  {bid.status.toUpperCase()}
                </span>
              </div>

              <p className="text-zinc-300 mb-2">{bid.message}</p>

              <p className="text-zinc-500 text-sm">
                Your Price: ₹{bid.price}
              </p>

              {bid.gigId?._id && (
                <Link
                  to={`/gig/${bid.gigId._id}`}
                  className="inline-block mt-3 text-yellow-400 text-sm hover:underline"
                >
                  View Gig →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
