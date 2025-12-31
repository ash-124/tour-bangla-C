import { useNavigate } from "react-router-dom";

const SinglePackage = ({ pkg }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        group relative bg-base-100 rounded-xl overflow-hidden
        shadow-md hover:shadow-2xl
        transition-all duration-300 ease-in-out
        hover:-translate-y-1
      "
    >
      {/* Popular Badge (optional logic) */}
      {pkg?.isPopular && (
        <span className="absolute top-3 left-3 z-10 badge badge-warning badge-sm">
          Popular
        </span>
      )}

      {/* Image */}
      <figure className="h-36 overflow-hidden">
        <img
          src={pkg?.images?.[0]}
          alt={pkg?.name}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />
      </figure>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
          {pkg?.name}
        </h2>

        <p className="text-xs text-gray-500 line-clamp-2">
          {pkg?.description}
        </p>

        <div className="flex justify-between items-center mt-1">
          <p className="text-sm font-bold text-orange-500">
            ৳{pkg?.price}
          </p>

          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
            {pkg?.duration}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate(`/package/${pkg?._id}`)}
          className="
            btn btn-sm btn-outline btn-warning mt-2
            transition-all duration-300
            group-hover:bg-warning group-hover:text-white
          "
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default SinglePackage;
