import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
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
      toast.success("Login successfully")
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Credentials")
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-10">
        {/* Logo */}
        <h1 className="text-yellow-400 text-2xl font-extrabold tracking-widest mb-8 text-center">
          GIGFLOW_
        </h1>

        <h2 className="text-white text-lg font-bold mb-6 text-center">LOGIN</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full bg-black border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full bg-black border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 hover:bg-yellow-300 transition"
          >
            LOGIN →
          </button>
        </form>

        <p className="text-zinc-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
