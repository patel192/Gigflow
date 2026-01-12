import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function CreateGig() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: ""
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
        budget: Number(form.budget)
      });

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to create gig. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-extrabold text-yellow-400 tracking-widest mb-8">
          CREATE GIG
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 p-10 space-y-6"
        >
          {error && (
            <div className="border border-red-500 text-red-400 px-4 py-2 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Title</label>
            <input
              name="title"
              required
              placeholder="e.g. Build a React dashboard"
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 px-4 py-3 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Description</label>
            <textarea
              name="description"
              required
              rows={5}
              placeholder="Describe the project requirements clearly..."
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 px-4 py-3 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Budget (₹)</label>
            <input
              name="budget"
              type="number"
              required
              placeholder="5000"
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 px-4 py-3 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 hover:bg-yellow-300 transition"
          >
            POST GIG →
          </button>
        </form>
      </div>
    </div>
  );
}
