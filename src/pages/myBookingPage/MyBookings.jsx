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
            const { data } = await axiosPublic.get(`/bookedPackages/?email=${user?.email}`);
            return data;
        }
    })
    console.log(bookedPackages)
    if (isLoading) {
        return (
            <div className='flex items-center justify-center p-10'>
                <span className="loading loading-bars loading-lg"></span>

            </div>
        )
    }
    return (
        <div className="w-full overflow-x-auto">
            <div className="inline-block min-w-[700px] w-full">
                <table className="table w-full text-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Package</th>
                            <th>Guide</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedPackages?.map((pkg, idx) => (
                            <BookingRow refetch={refetch} key={pkg._id} pkg={pkg} i={idx} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;