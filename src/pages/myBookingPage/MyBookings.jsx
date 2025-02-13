import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const MyBookings = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: bookedPackages = [], isLoading } = useQuery({
        queryKey: [user?.email, 'booked-packages'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/bookedPackages/?email=${user?.email}`);
            return data;
        }
    })
    console.log(bookedPackages)
    if(isLoading){
        return (
            <div className='flex items-center justify-center p-10'>
                <span className="loading loading-bars loading-lg"></span>

            </div>
        )
    }
    return (
        <div>
            my Bookings: {bookedPackages?.length}
        </div>
    );
};

export default MyBookings;