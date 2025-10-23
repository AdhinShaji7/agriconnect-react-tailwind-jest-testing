import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import ServiceDetails from "./pages/ServiceDetails";
import { ForumProvider } from "./context/ForumContext";

export default function App() {
  return (
    <ForumProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
        </Routes>
      </div>
    </ForumProvider>
  );
}
