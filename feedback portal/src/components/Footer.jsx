import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ user }) => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-white">Student Portal</span>
          <span className="text-sm text-gray-300 mt-1">Anonymous feedback system for students</span>
        </div>

        <nav className="flex gap-4 flex-wrap">
          <Link to="/" className="text-sm text-gray-300 hover:text-white">Home</Link>
          {user ? (
            <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white">Dashboard</Link>
          ) : null}
          <Link to="/register" className="text-sm text-gray-300 hover:text-white">Sign Up</Link>
          <Link to="/login" className="text-sm text-gray-300 hover:text-white">Login</Link>
        </nav>

        <div className="text-sm text-gray-400">
          <div>Contact: <a href="mailto:admin@example.com" className="text-gray-300 hover:underline">anonymousfeedbackportal@gmail.com</a></div>
          <div className="mt-1 text-gray-400">Version 1.0 • © {new Date().getFullYear()}</div>
        </div>
      </div>

      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-3 text-xs text-gray-400 flex justify-between">
          <span>MADE BY - LOKESH, JAGADISH, SURAJ, LALIT</span>
          <a href="#top" className="hover:underline text-gray-300">Back to top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;