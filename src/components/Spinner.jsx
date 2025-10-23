import React from "react";

export default function Spinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      <p className="text-green-700 font-semibold text-lg">{message}</p>
    </div>
  );
}
