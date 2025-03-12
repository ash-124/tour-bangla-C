import React from "react";
import { useNavigate } from "react-router-dom";

const GuideCard = ({ guide }) => {
    const navigate = useNavigate();

    return (
        <div className="card w-64 bg-base-100 shadow-xl border border-gray-200">
            <figure>
                <img src={guide.photoURL} alt={guide.name} className="w-full h-36 object-cover" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title text-lg font-bold">{guide.name}</h2>
                <p className="text-sm text-gray-500">{guide.email}</p>
                <div className="card-actions justify-end">
                    <button
                    disabled
                        className="btn btn-primary btn-sm"
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
