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
       <div className='flex items-center justify-center'>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center max-w-4xl py-5 mx-auto gap-5 md:gap-0 ">
            {packages.map(pkg => <SinglePackage key={pkg._id} pkg={pkg} />)}

        </div>
       </div>
    );
};

export default Package;