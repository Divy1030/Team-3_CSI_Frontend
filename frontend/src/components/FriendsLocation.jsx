import React from "react";
import "./FriendsLocation.css"; // Ensure you have the CSS for hiding the scrollbar and toggle switch

const FriendsLocation = () => {
  return (
    <div
      className="flex flex-col p-2 bg-gray-800 text-white rounded-xl shadow-lg w-80 h-full hide-scrollbar"
      style={{ overflowY: 'auto' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-2">
        <h1 className="text-purple-400 text-lg font-bold">hola'</h1>
        <button className="text-purple-400 text-lg">&larr;</button>
      </header>

      {/* Search Bar */}
      <input
        type="text"
        className="w-full p-1 rounded-md bg-gray-700 text-white placeholder-gray-400 mb-3 text-sm"
        placeholder="Search location, friends..."
      />

      {/* Friends Location */}
      <section className="mb-3 flex-1">
        <h2 className="text-md font-semibold text-purple-400 mb-1">
          Your friends location
        </h2>
        <ul className="space-y-1">
          {["online", "was online", "online", "was online"].map((status, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-700 p-1 rounded-md"
            >
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Friend"
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-xs">Alanna Myassa</span>
              </div>
              <span
                className={`text-xs ${
                  status === "online" ? "text-green-400" : "text-gray-400"
                }`}
              >
                {status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Hide Activity From */}
      <section className="mb-3">
        <h2 className="text-md font-semibold text-purple-400 mb-1">
          Hide activity from
        </h2>
        <ul className="space-y-1">
          {Array(5).fill(0).map((_, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-700 p-1 rounded-md"
            >
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Friend"
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-xs">Alanna Myassa</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* My Location */}
      <section className="mb-3">
        <h2 className="text-md font-semibold text-purple-400 mb-1">
          My location
        </h2>
        <div className="flex items-center bg-gray-700 p-1 rounded-md">
          <img
            src="https://via.placeholder.com/40"
            alt="Your Avatar"
            className="w-6 h-6 rounded-full mr-2"
          />
          <div>
            <span className="block text-xs">Divy</span>
            <span className="block text-xs text-gray-400">
              AKGEC, Ghaziabad, Uttar Pradesh
            </span>
          </div>
        </div>
      </section>

      {/* Back to Home Button */}
      <button className="w-full p-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-md text-sm">
        Back to home
      </button>
    </div>
  );
};

export default FriendsLocation;