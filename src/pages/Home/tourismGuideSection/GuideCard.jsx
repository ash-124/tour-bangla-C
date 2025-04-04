import React from "react";
import { useNavigate } from "react-router-dom";

const GuideCard = ({ guide }) => {
    const navigate = useNavigate();

    return (
        <div className="card w-64 bg-base-100 shadow-xl ">
            <figure>
                <img src={guide.photoURL} alt={guide.name} className="w-full h-32 object-cover" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title font-bold">{guide.name}</h2>
                <p className="text-sm text-gray-500">{guide.email}</p>
                <div className="card-actions justify-end">
                    <button
                    disabled
                        className="btn-prime btn-sm"
                        onClick={() => navigate(`/tour-guide/`)}
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuideCard;
