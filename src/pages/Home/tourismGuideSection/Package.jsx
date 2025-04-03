import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import SinglePackage from '../../singlePackage/SinglePackage';

const Package = () => {
    const axiosPublic = useAxiosPublic();

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
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-center items-center w-11/12 mx-auto ">
            {packages.map(pkg => <SinglePackage key={pkg._id} pkg={pkg} />)}

        </div>
    );
};

export default Package;