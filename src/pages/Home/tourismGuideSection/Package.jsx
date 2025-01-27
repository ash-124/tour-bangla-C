import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Package = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    // TO:DO
    // make the view details page of tour package with a form to apply for package 
    const { data: packages = [], isLoading, isError } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/packages/?random=true');
            return data;
        }
    })
    if (isError) {
        return <div>Error loading packages. Please try again later.</div>;
    }

    // Loading State
    if (isLoading) {
        return <div>Loading packages...</div>;
    }
    console.log("package data's", packages)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {packages.map((pkg) => (
                <div key={pkg._id} className="card w-full bg-base-100 shadow-xl">
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
            ))}
        </div>
    );
};

export default Package;