import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const ManageStories = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ["stories", user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(
                `/stories?email=${user?.email}`
            );
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <span className="loading loading-spinner loading-lg text-gray-700"></span>
            </div>
        );
    }

    if (!stories.length) {
        return (
            <div className="text-center mt-20 text-gray-600">
                <p className="text-lg font-medium">No stories found</p>
                <p className="text-sm">Start by adding your first travel story 🌍</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-8 text-[#BFC1CC]">
                Manage Stories
            </h1>

            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                {stories.map((story) => (
                    <div
                        key={story._id}
                        className="bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                    >
                        {/* Image Section */}
                        <div className="bg-gray-900 p-3">
                            <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600">
                                {story.images?.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt="story"
                                        className="h-28 w-40 object-cover rounded-lg flex-shrink-0 hover:scale-105 transition-transform"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Text Section */}
                        <div className="p-4 text-gray-100">
                            <h2 className="text-lg font-semibold mb-2">
                                {story.title}
                            </h2>
                            <p className="text-sm text-gray-300 line-clamp-3">
                                {story.description}
                            </p>
                        </div>

                        {/* Action Section */}
                        <div className="flex justify-end gap-3 px-4 py-3 border-t border-gray-700 bg-gray-900">
                            <Link
                                to={`/dashboard/edit-story/${story._id}`}
                                className="btn btn-sm bg-white text-gray-900 border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
                            >
                                <FaEdit /> Edit
                            </Link>

                            <button
                                className="btn btn-sm bg-gray-800 text-white border border-gray-400 hover:bg-gray-700 flex items-center gap-2"
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
