import React from "react";
import { Link } from "react-router-dom";

export default function ServiceCard({ id, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-green-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-green-700 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
      </div>

      <Link
        to={`/service/${id}`}
        className="mt-auto text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-all"
      >
        View Details
      </Link>
    </div>
  );
}
