import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
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
          Welcome back — login to continue
        </p>

        {/* Title */}
        <h2 className="text-white text-lg font-bold mb-6 text-center tracking-wider">
          LOGIN
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 pl-11 pr-4 py-3 text-white rounded-xl focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="password"
              name="password"
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
            LOGIN
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer */}
        <p className="text-zinc-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-400 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
