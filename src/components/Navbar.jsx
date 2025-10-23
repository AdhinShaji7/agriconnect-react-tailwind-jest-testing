import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
        <Link to="/" className="font-bold text-lg">Agri Connect</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/forum" className="hover:text-gray-200">Forum</Link>
        </div>
      </div>
    </nav>
  );
}
