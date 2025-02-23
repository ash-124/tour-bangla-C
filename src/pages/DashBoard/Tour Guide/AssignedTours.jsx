import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const AssignedTours = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const { data: assignedTours } = useQuery({
        queryKey: [user?.email, 'assigned tours'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/assigned-tours/?email=${user?.email}`);
            return data;
        }
    })
    console.log(assignedTours);
    return (
        <div>
            <h2 className='text-2xl font-semibold text-gray-400 text-center my-5'>My Assigned Tours</h2>
            {/* table of assigned tours */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            {/* package's name, tourist name, tour date, tour price, status.  */}
                            <th></th>
                            <th>Package</th>
                            <th>Tourist</th>
                            <th>Tour Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedTours.map((tour, i)=>
                        <tr key={tour._id}>
                            <th>{i+1}</th>
                            <td>{tour.packageName}</td>
                            {/* change the email to real tourist name */}
                            <td>{tour.userEmail}</td>
                            <td>{new Date(tour.tourDate).toLocaleDateString('en-GB')}</td>
                            <td>{tour.price}</td>
                            <td>{tour.status}</td>
                        </tr>)}                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedTours;