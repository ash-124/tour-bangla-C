import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearchLocation } from "react-icons/fa";


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
        <h1 className="text-4xl font-bold mb-4 text-center">Explore Your Travel</h1>
        <p className="mb-6 text-sm text-center">
          Discover your next great adventure, become an explorer to get started!
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-slate-500 p-2 rounded-lg shadow-lg flex flex-wrap items-center gap-2  text-sm "
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
            className="p-2 border border-gray-300 rounded-lg flex-grow "
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
            className="p-2 text-slate-500 border border-gray-300 rounded-lg flex-grow "
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
            className=" btn-prime flex items-center justify-center flex-grow"
          >
            <p className="hidden md:block">Find Now</p>
            <span className="ml-1"> <FaSearchLocation /></span>

          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
