import React, { useState } from "react";

const Banner = () => {
  const [formData, setFormData] = useState({
    destination: "",
    minPrice: "",
    maxPrice: "",
    duration: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle search logic here
    console.log(formData);
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen bg-banner-img"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-white pb-16 px-4 md:px-0">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-white drop-shadow-lg">
          Explore Your Travel
        </h1>
        <p className="mb-6 text-center text-gray-300 text-sm md:text-base max-w-xl drop-shadow">
          Find your perfect package within your budget and time.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-[#0F172A] p-3 md:p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-3 md:gap-4 w-full max-w-4xl"
        >
          {/* Destination */}
          <input
            type="text"
            name="destination"
            placeholder="Where to?"
            value={formData.destination}
            onChange={(e) =>
              setFormData({ ...formData, destination: e.target.value })
            }
            className="p-3 border border-[#E5E7EB] rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-[#FF7A18] placeholder:text-[#64748B]"
          />

          {/* Price Range */}
          <div className="flex  gap-2 ">
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={formData.minPrice}
              onChange={(e) =>
                setFormData({ ...formData, minPrice: e.target.value })
              }
              className="p-3 border border-[#E5E7EB] rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#FF7A18] placeholder:text-[#64748B]"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={formData.maxPrice}
              onChange={(e) =>
                setFormData({ ...formData, maxPrice: e.target.value })
              }
              className="p-3 border border-[#E5E7EB] rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#FF7A18] placeholder:text-[#64748B]"
            />
          </div>

          {/* Duration */}
          <select
            name="duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            className="p-3 border border-[#E5E7EB] rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-[#FF7A18]"
          >
            <option value="" disabled>
              Duration
            </option>
            <option value="1 Day">1 Day</option>
            <option value="2-3 Days">2-3 Days</option>
            <option value="4-5 Days">4-5 Days</option>
            <option value="6+ Days">6+ Days</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#FF7A18] text-white rounded-lg px-4 py-2 flex items-center justify-center hover:bg-orange-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
