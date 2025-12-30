import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

// Sample stories data
const stories = [
  {
    _id: "1",
    title: "Beautiful Sundarbans",
    description: "A wonderful trip to the Sundarbans mangrove forest.",
    images: [
      "/images/sundarbans1.jpg",
      "/images/sundarbans2.jpg",
      "/images/sundarbans3.jpg",
    ],
  },
  {
    _id: "2",
    title: "Cox's Bazar Adventure",
    description: "Exploring the world's longest beach.",
    images: ["/images/cox1.jpg", "/images/cox2.jpg", "/images/cox3.jpg"],
  },
  {
    _id: "3",
    title: "Srimangal Tea Gardens",
    description: "Walking through lush green tea gardens.",
    images: ["/images/srimangal1.jpg", "/images/srimangal2.jpg"],
  },
];

const ManageStories = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Stories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-gray-800 text-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Image Section */}
            <div className="flex overflow-x-auto gap-2 p-2 bg-gray-900">
              {story.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`story-${idx}`}
                  className="h-32 w-32 object-cover rounded-lg flex-shrink-0 hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>

            {/* Text Section */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{story.title}</h2>
              <p className="text-gray-300">{story.description}</p>
            </div>

            {/* Action Buttons Section */}
            <div className="p-4 flex justify-end gap-2 border-t border-gray-700 bg-gray-900">
              <Link
                to={`/dashboard/edit-story/${story._id}`}
                className="btn btn-sm btn-primary bg-white text-gray-900 border-2 border-black flex items-center gap-2"
              >
                <FaEdit /> Edit
              </Link>
              <button
                className="btn btn-sm btn-error bg-[#1F2937] border-2 border-white text-white flex items-center gap-2"
                // Add delete function here
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
