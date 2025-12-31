import { useNavigate } from "react-router-dom";

const GuideCard = ({ guide }) => {
    const navigate = useNavigate();

    return (
        <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            {/* Image */}
            <div className="relative h-40 w-full overflow-hidden">
                <img
                    src={guide.photoURL}
                    alt={guide.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-slate-900">
                    {guide.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Professional Tour Guide
                </p>

                <button
                    onClick={() => navigate(`/tour-guide/${guide._id}`)}
                    className="
                        mt-4 w-full rounded-lg
                        border border-[#FF7A18]
                        py-2 text-sm font-medium text-[#FF7A18]
                        transition hover:bg-[#FF7A18] hover:text-white
                    "
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default GuideCard;
