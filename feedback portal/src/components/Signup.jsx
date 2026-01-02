import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Signup({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios.post(`${API_BASE_URL}/register`, { name, email, password })
      .then((result) => {
        setMessage("Signup successful!");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      })
      .catch((err) => {
        setMessage("Signup failed!");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eaff] to-[#f9f9f9] flex items-center justify-center px-4">
     
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={
          "max-w-md w-full p-8 bg-white rounded-2xl transform transition-all duration-700 ease-out shadow-lg " +
          (mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-6")
        }
        style={{
          border: "1px solid",
          borderColor: hovered ? "rgba(79,70,229,0.18)" : "rgba(229,231,235,1)", // soft indigo on hover, neutral otherwise
          boxShadow: hovered ? "0 10px 30px rgba(79,70,229,0.06)" : undefined
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-blue-50 text-blue-600 animate-pulse">
            {/* icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l7 3v5c0 5-3.5 9.7-7 12-3.5-2.3-7-7-7-12V5l7-3z" />
            </svg>
          </div>
          <h2 className="text-center text-2xl font-bold text-blue-600">Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="transition duration-500 delay-75">
            <label className="block font-medium text-gray-700 mb-1">Name</label>
            <input
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:shadow-md focus:ring-2 focus:ring-blue-200 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="transition duration-500 delay-150">
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:shadow-md focus:ring-2 focus:ring-blue-200 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div className="transition duration-500 delay-200">
            <label className="block font-medium text-gray-700 mb-1">Password</label>
            <input
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:shadow-md focus:ring-2 focus:ring-blue-200 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 rounded-lg text-white font-semibold shadow-md transform transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            style={{ background: "linear-gradient(90deg,#2563eb,#06b6d4)" }}
          >
            {submitting ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {message && <p className="text-center text-sm text-green-600 mt-4">{message}</p>}

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-600 font-medium hover:underline">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;