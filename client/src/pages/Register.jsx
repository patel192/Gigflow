import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-8 md:p-10 shadow-xl">

        {/* Logo */}
        <h1 className="text-yellow-400 text-2xl font-extrabold tracking-widest mb-2 text-center">
          GIGFLOW_
        </h1>

        <p className="text-zinc-500 text-sm text-center mb-8">
          Create your account and start your journey
        </p>

        {/* Title */}
        <h2 className="text-white text-lg font-bold mb-6 text-center tracking-wider">
          CREATE ACCOUNT
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              name="name"
              required
              placeholder="Username"
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 pl-11 pr-4 py-3 text-white rounded-xl focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 pl-11 pr-4 py-3 text-white rounded-xl focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 pl-11 pr-4 py-3 text-white rounded-xl focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition flex items-center justify-center gap-2"
          >
            REGISTER
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer */}
        <p className="text-zinc-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
