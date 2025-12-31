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
    });

    if (isError) {
        return (
            <p className="text-center text-red-500">
                Failed to load packages.
            </p>
        );
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="h-64 rounded-xl bg-slate-200 animate-pulse"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map(pkg => (
                <SinglePackage key={pkg._id} pkg={pkg} />
            ))}
        </div>
    );
};

export default Package;
