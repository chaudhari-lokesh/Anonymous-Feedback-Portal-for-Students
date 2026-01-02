import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStatus, setForgotStatus] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios.post(`${API_BASE_URL}/login`, { email, password })
      .then(res => {
        setUser && setUser(res.data.user || { email });
        localStorage.setItem("user", JSON.stringify(res.data.user || { email }));
        navigate("/dashboard");
      })
      .catch(err => {
        setMessage("Login failed");
      })
      .finally(() => setSubmitting(false));
  };

  const handleForgotSubmit = async (e) => {
    e?.preventDefault();
    if (!forgotEmail) {
      setForgotStatus("Please enter your email.");
      return;
    }
    try {
      setForgotLoading(true);
      setForgotStatus("");
      const res = await axios.post(`${API_BASE_URL}/forgot-password`, { email: forgotEmail });
      setForgotStatus("Check your email for the reset link!");
    } catch (error) {
      setForgotStatus("Failed to send reset link.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f9ff] to-[#ffffff] flex items-center justify-center px-4">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={
          "max-w-md w-full p-8 bg-white rounded-2xl transform transition-all duration-700 ease-out shadow-lg " +
          (mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-6")
        }
        style={{
          border: "1px solid",
          borderColor: hovered ? "rgba(16,185,129,0.16)" : "rgba(229,231,235,1)", // soft green on hover, neutral otherwise
          boxShadow: hovered ? "0 10px 30px rgba(16,185,129,0.06)" : undefined
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-green-50 text-green-600 animate-pulse">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0-2.5 2-4.5 4.5-4.5S21 8.5 21 11s-2 4.5-4.5 4.5S12 13.5 12 11z" />
            </svg>
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-800">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="transition duration-500 delay-75">
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:shadow-md focus:ring-2 focus:ring-green-200 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div className="transition duration-500 delay-150">
            <label className="block font-medium text-gray-700 mb-1">Password</label>
            <input
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:shadow-md focus:ring-2 focus:ring-green-200 transition"
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
            style={{ background: "linear-gradient(90deg,#10b981,#06b6d4)" }}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="text-center text-sm text-red-600 mt-4">{message}</p>}

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")} className="text-green-600 font-medium hover:underline">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;