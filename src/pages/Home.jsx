// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [commodities, setCommodities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/services.json");
        console.log("Fetched data:", res.data);
        setTimeout(() => {
          setCommodities(res.data);
          setFiltered(res.data);
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.error("Error fetching services:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    setSearching(true);
    setTimeout(() => {
      const result = commodities.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(result);
      setSearching(false);
    }, 500);
  };

  if (loading) return <Spinner message="Loading Commodities..." />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        🌾 AgriConnect Commodities
      </h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for crops, seeds, or equipment..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-green-400 focus:border-green-600 focus:ring-2 focus:ring-green-200 p-3 w-full rounded-lg outline-none shadow-sm transition-all duration-300"
        />
      </div>

      {searching && (
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          <p className="text-green-700 font-medium">Searching...</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((commodity) => (
          <div
            key={commodity.id}
            className="bg-white rounded-xl shadow-md border border-green-100 
              hover:shadow-xl focus:shadow-xl hover:scale-105 focus:scale-105 transition-all duration-300 p-4 animate-fadeIn"
            tabIndex={0} // allows focus on mobile tap
          >
            <h2 className="text-lg font-semibold text-green-700">
              {commodity.title}
            </h2>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {commodity.description}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-green-700 font-semibold">
                ₹{commodity.price || "N/A"} / {commodity.unit || "unit"}
              </span>
              <Link
                to={`/service/${commodity.id}`}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded-md 
                  hover:bg-green-700 focus:bg-green-700 hover:scale-105 focus:scale-105 transition-transform duration-300"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !searching && (
        <p className="text-center text-gray-500 mt-8">
          No commodities found for “{search}”.
        </p>
      )}
    </div>
  );
}
