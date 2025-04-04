import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import SinglePackage from './singlePackage/SinglePackage';

const Packages = () => {
    const axiosPublic = useAxiosPublic();

    const { data: packages = [], isLoading, isError } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/packages');
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
        <div className=" w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16 gap-6 p-4">
            {packages.map(pkg => <SinglePackage key={pkg._id} pkg={pkg} />)}

        </div>
    );
};

export default Packages;