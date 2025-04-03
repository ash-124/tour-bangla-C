import { useNavigate } from "react-router-dom";

const SinglePackage = ({ pkg }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="card w-[270px] shadow-xl">
                <figure>
                    <img
                        src={pkg.images[0]}
                        alt={pkg.name}
                        className="h-48 w-full object-cover"
                    />
                </figure>
                <div className=" p-4 flex flex-col gap-2  ">
                    <h2 className="  font-bold  ">{pkg.name}</h2>
                    <p className="text-sm text-gray-500 mt-2">: {pkg.description?.slice(0,35)}......</p>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-orange-500">৳{pkg.price}</p>
                        <p className=" text-sm text-black">{pkg?.duration}</p>
                    </div>
                    <div className="card-actions justify-end mt-2">
                        <button
                            className="btn-prime text-xs"
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