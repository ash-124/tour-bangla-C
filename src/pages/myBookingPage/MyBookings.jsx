import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import BookingRow from './BookingRow';

const MyBookings = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: bookedPackages = [], isLoading, refetch } = useQuery({
        queryKey: [user?.email, 'booked-packages'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(
                `/bookedPackages/?email=${user?.email}`
            );
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <span className="loading loading-spinner loading-lg text-white"></span>
            </div>
        );
    }

    return (
        <div className="w-full ">
            <div className="bg-[#2B3440] border-2 border-[#BFC1CC] rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-white mb-4 text-center">
                    My Bookings
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-[800px] w-full text-sm text-white">
                        <thead>
                            <tr className="border-b border-[#BFC1CC]/40 text-left">
                                <th className="py-3 px-2"></th>
                                <th className="py-3 px-2">Package</th>
                                <th className="py-3 px-2">Guide</th>
                                <th className="py-3 px-2">Date</th>
                                <th className="py-3 px-2">Price</th>
                                <th className="py-3 px-2">Status</th>
                                <th className="py-3 px-2 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookedPackages.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center py-10 text-white/70"
                                    >
                                        No bookings found
                                    </td>
                                </tr>
                            ) : (
                                bookedPackages.map((pkg, idx) => (
                                    <BookingRow
                                        key={pkg._id}
                                        pkg={pkg}
                                        i={idx}
                                        refetch={refetch}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
