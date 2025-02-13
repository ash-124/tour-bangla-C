import { useNavigate } from "react-router-dom";

const SinglePackage = ({ pkg }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={pkg.images[0]}
                        alt={pkg.name}
                        className="h-48 w-full object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{pkg.name}</h2>
                    <p className="text-sm text-gray-500">{pkg.description}</p>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-lg font-bold text-primary">৳{pkg.price}</p>
                        <p className="text-sm text-gray-600">{pkg.duration}</p>
                    </div>
                    <div className="card-actions justify-end mt-4">
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => navigate(`/package/${pkg._id}`)}
                        >
                            View Package
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SinglePackage;