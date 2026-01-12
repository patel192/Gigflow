import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const stats = [
    ["500+", "Gigs Posted"],
    ["1200+", "Freelancers"],
    ["95%", "Hire Success"],
    ["24h", "Avg Hiring Time"],
  ];
  const features = [
    ["POST GIGS", "Create jobs in seconds with clear budget and description."],
    [
      "SMART BIDS",
      "Compare freelancer proposals, pricing, and messages easily.",
    ],
    ["SECURE HIRING", "Hire one freelancer while others auto-update."],
    ["SEARCH SYSTEM", "Find gigs by title using fast keyword search."],
    ["DASHBOARD", "Manage your gigs, bids, and hiring from one place."],
    ["AUTH SYSTEM", "JWT authentication with secure HttpOnly cookies."],
  ];
  const process = [
    [
      "1. CREATE ACCOUNT",
      "Register as a user. You can be both client and freelancer.",
    ],
    [
      "2. POST OR BROWSE",
      "Clients post gigs. Freelancers browse open opportunities.",
    ],
    [
      "3. BID WITH PROPOSAL",
      "Freelancers submit price and message for each gig.",
    ],
    [
      "4. HIRE WITH ONE CLICK",
      "Client selects a bid. System auto-updates all others.",
    ],
  ];
  const users = [
    ["STARTUPS", "Hire developers, designers, and marketers quickly."],
    ["FREELANCERS", "Find real gigs and send competitive proposals."],
    ["STUDENTS", "Practice real-world bidding and project workflows."],
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-zinc-800">
        <h1 className="text-2xl font-extrabold text-yellow-400 tracking-widest">
          GIGFLOW_
        </h1>

        <div className="space-x-6 text-sm uppercase tracking-wider">
          <Link to="/login" className="hover:text-yellow-400">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-yellow-400 text-black px-5 py-2 font-bold"
          >
            Start
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-28 px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-6 tracking-wide">
          BUILD. BID. HIRE.
        </h2>

        <p className="text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          GigFlow is a minimalist freelance marketplace where clients post jobs,
          freelancers compete with bids, and hiring becomes fast, structured,
          and transparent.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/gigs"
            className="bg-yellow-400 text-black px-8 py-4 font-bold hover:bg-yellow-300"
          >
            Browse Gigs →
          </Link>

          <Link
            to="/register"
            className="border border-yellow-400 text-yellow-400 px-8 py-4 font-bold hover:bg-yellow-400 hover:text-black"
          >
            Post a Gig
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-800 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">
          {stats.map(([num, label], i) => (
            <div key={i}>
              <h3 className="text-yellow-400 text-3xl font-bold">{num}</h3>
              <p className="text-zinc-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 py-24">
        <h2 className="text-yellow-400 text-3xl font-bold tracking-widest mb-10">
          FEATURES
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map(([title, desc], i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-8">
              <h3 className="text-yellow-400 font-bold mb-3 tracking-widest">
                {title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-zinc-800 py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-yellow-400 text-3xl font-bold tracking-widest mb-12">
            HOW IT WORKS
          </h2>

          <div className="space-y-8">
            {process.map(([title, desc], i) => (
              <div key={i} className="border border-zinc-800 p-6 bg-zinc-900">
                <h3 className="text-yellow-400 font-bold mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="max-w-6xl mx-auto px-8 py-24">
        <h2 className="text-yellow-400 text-3xl font-bold tracking-widest mb-10">
          WHO IS IT FOR?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {users.map(([title, desc], i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-8">
              <h3 className="text-yellow-400 font-bold mb-3 tracking-widest">
                {title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800 py-20 text-center">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-6">
          READY TO USE GIGFLOW?
        </h2>
        <p className="text-zinc-400 mb-10">
          Build, bid, and hire on a clean and structured freelance platform.
        </p>
        <Link
          to="/register"
          className="bg-yellow-400 text-black px-10 py-4 font-bold hover:bg-yellow-300"
        >
          Create Your Account →
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-zinc-500 text-xs border-t border-zinc-800">
        GIGFLOW — FULL STACK INTERNSHIP PROJECT
        <br />
        Built with React, Node.js, MongoDB
      </footer>
    </div>
  );
};
