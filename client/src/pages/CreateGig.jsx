import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  FilePlus,
  Type,
  AlignLeft,
  IndianRupee,
  Send,
} from "lucide-react";

export default function CreateGig() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/gigs", {
        title: form.title,
        description: form.description,
        budget: Number(form.budget),
      });
      toast.success("Gig posted successfully");
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Failed to create gig. Try again.");
      }
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <FilePlus size={18} />
            <span className="text-sm uppercase tracking-widest">
              Create New Gig
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 tracking-widest">
            POST A PROJECT
          </h1>

          <p className="text-zinc-500 mt-2 text-sm md:text-base">
            Describe your project clearly to attract top freelancers.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6"
        >
          {error && (
            <div className="border border-red-500 text-red-400 px-4 py-2 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <Type size={14} />
              Title
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Build a React dashboard"
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <AlignLeft size={14} />
              Description
            </label>
            <textarea
              name="description"
              required
              rows={6}
              placeholder="Describe your project requirements clearly..."
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <IndianRupee size={14} />
              Budget
            </label>
            <input
              name="budget"
              type="number"
              required
              placeholder="5000"
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition flex items-center justify-center gap-2"
          >
            POST GIG
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
