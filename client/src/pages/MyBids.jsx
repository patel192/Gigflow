import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  IndianRupee,
  ExternalLink,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export const MyBids = () => {
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

  const statusStyles = {
    hired: {
      class: "border-green-500 text-green-400 bg-green-500/10",
      icon: <CheckCircle size={14} />,
    },
    rejected: {
      class: "border-red-500 text-red-400 bg-red-500/10",
      icon: <XCircle size={14} />,
    },
    pending: {
      class: "border-yellow-400 text-yellow-400 bg-yellow-400/10",
      icon: <Clock size={14} />,
    },
  };
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-yellow-400 tracking-widest mb-10">
        MY BIDS
      </h1>

      {error && (
        <div className="border border-red-500 text-red-400 px-4 py-2 mb-6 rounded-lg">
          {error}
        </div>
      )}

      {bids.length === 0 ? (
        <p className="text-zinc-500">You have not submitted any bids yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bids.map((bid) => {
            const style = statusStyles[bid.status];

            return (
              <div
                key={bid._id}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4 hover:border-yellow-400 transition"
              >
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Briefcase size={16} />
                      <h2 className="font-bold line-clamp-2">
                        {bid.gigId?.title || "Gig"}
                      </h2>
                    </div>

                    <p className="text-zinc-500 text-sm flex items-center gap-1">
                      <IndianRupee size={14} />
                      Budget: {bid.gigId?.budget}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1 border rounded-full ${style.class}`}
                  >
                    {style.icon}
                    {bid.status.toUpperCase()}
                  </span>
                </div>

                {/* Message */}
                <p className="text-zinc-400 text-sm line-clamp-3">
                  {bid.message}
                </p>

                {/* Price */}
                <p className="text-zinc-500 text-sm flex items-center gap-1">
                  <IndianRupee size={14} />
                  Your Price: {bid.price}
                </p>

                {/* Link */}
                {bid.status === "hired" ? (
                  <Link
                    to={`/dashboard/hired/${bid.gigId._id}`}
                    className="text-green-400 font-semibold"
                  >
                    View Project →
                  </Link>
                ) : (
                  <Link
                    to={`/dashboard/gig/${bid.gigId._id}`}
                    className="text-yellow-400 font-semibold"
                  >
                    View Gig →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
