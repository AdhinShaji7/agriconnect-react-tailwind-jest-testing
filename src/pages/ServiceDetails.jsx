import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/services.json")
      .then((res) => {
        const found = res.data.find((item) => item.id === Number(id));
        setTimeout(() => {
          setService(found);
          setLoading(false);
        }, 1500); 
      })
      .catch((err) => {
        console.error("Error fetching details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;

  if (!service)
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-red-600">
          Commodity not found!
        </h2>
        <Link to="/" className="text-green-700 underline mt-4 block">
          Back to Home
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-2xl border border-green-100">
      <div>
        <h1 className="text-3xl font-bold text-green-700 mb-3">
          {service.title}
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {service.description}
        </p>

        <div className="bg-green-50 p-4 rounded-lg mb-4 border border-green-100">
          <p className="text-lg font-semibold text-gray-800">
            🌾 Price:{" "}
            <span className="text-green-700">
              ₹{service.price || "N/A"} / {service.unit || "unit"}
            </span>
          </p>
          <p className="text-gray-600 mt-1">
            📦 Category: {service.category || "General"}
          </p>
          <p className="text-gray-600 mt-1">
            📍 Location: {service.location || "Available across India"}
          </p>
        </div>

        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition-all duration-300 shadow-md"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
