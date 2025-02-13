import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Banner = () => {
  const [formData, setFormData] = useState({
    destination: "",
    date: null,
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission
    // Add your logic to process the form data here
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen bg-banner-img"
      
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-white pb-16">
        <h1 className="text-4xl font-bold mb-4">Explore Your Travel</h1>
        <p className="mb-6 text-lg">
          Discover your next great adventure, become an explorer to get started!
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-slate-500 p-4 rounded-lg shadow-lg flex items-center space-x-4 "
        >
          {/* Destination Input */}
          <input
            type="text"
            name="destination"
            placeholder="Where to?"
            value={formData.destination}
            onChange={(e) =>
              setFormData({ ...formData, destination: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-lg flex-grow"
          />

          {/* Date Picker */}
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            placeholderText="When"
            className="p-2 border border-gray-300 rounded-lg flex-grow"
          />

          {/* Type Select */}
          <select
            name="type"
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            className="p-2 text-slate-500 border border-gray-300 rounded-lg flex-grow"
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="adventure">Adventure</option>
            <option value="beach">Beach</option>
            <option value="city">City</option>
            <option value="mountain">Mountain</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Find Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
