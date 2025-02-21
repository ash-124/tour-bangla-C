import React from 'react';
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
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Package</th>
                        <th>Guide</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        bookedPackages && bookedPackages.map((pkg, idx) =>
                            <BookingRow refetch={refetch} key={pkg._id} pkg={pkg} i={idx} />
                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MyBookings;