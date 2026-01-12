import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-10">
        
        {/* Logo */}
        <h1 className="text-yellow-400 text-2xl font-extrabold tracking-widest mb-8 text-center">
          GIGFLOW_
        </h1>

        <h2 className="text-white text-lg font-bold mb-6 text-center">
          CREATE ACCOUNT
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            placeholder="Username"
            onChange={handleChange}
            className="w-full bg-black border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full bg-black border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-black border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 hover:bg-yellow-300"
          >
            REGISTER →
          </button>
        </form>

        <p className="text-zinc-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
