import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Briefcase, IndianRupee, User, Mail, CheckCircle } from "lucide-react";

export default function HiredProject() {
  const { gigId } = useParams();
  const navigate = useNavigate();

  const [gig, setGig] = useState(null);
  const [myBid, setMyBid] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      const bidsRes = await api.get("/bids/my");

      const hiredBid = bidsRes.data.find(
        (b) => b.gigId?._id === gigId && b.status === "hired"
      );

      if (!hiredBid) {
        toast.error("You are not hired for this project");
        return navigate("/dashboard");
      }

      setMyBid(hiredBid);

      const gigRes = await api.get(`/gigs/${gigId}`);
      setGig(gigRes.data);
    } catch (err) {
      toast.error("Failed to load project");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading project...
      </div>
    );
  }

  if (!gig || !myBid) return null;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 space-y-8">

        <div className="flex items-center gap-3 text-green-400">
          <CheckCircle />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest">
            HIRED PROJECT
          </h1>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <Briefcase size={18} />
            <h2 className="text-xl font-bold">{gig.title}</h2>
          </div>

          <p className="text-zinc-400">{gig.description}</p>

          <div className="flex items-center gap-2 text-zinc-300">
            <IndianRupee size={16} />
            Agreed Price: ₹{myBid.price}
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h3 className="text-yellow-400 font-bold">CLIENT DETAILS</h3>

          <div className="flex gap-2 items-center text-zinc-300">
            <User size={16} />
            {gig.ownerId?.name || "Client"}
          </div>

          <div className="flex gap-2 items-center text-zinc-400 text-sm">
            <Mail size={16} />
            {gig.ownerId?.email || "Email not available"}
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-yellow-400 font-bold mb-2">YOUR PROPOSAL</h3>
          <p className="text-zinc-400">{myBid.message}</p>
        </div>

        <div className="border border-green-500 bg-green-500/10 text-green-400 px-6 py-4 rounded-xl font-semibold">
          Status: You are hired for this project.
        </div>
      </div>
    </div>
  );
}
