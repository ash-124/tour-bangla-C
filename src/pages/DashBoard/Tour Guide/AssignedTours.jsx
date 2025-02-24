import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AssignedTours = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const { data: assignedTours, isLoading, refetch } = useQuery({
        queryKey: [user?.email, 'assigned tours'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/assigned-tours/?email=${user?.email}`);
            return data;
        }
    })
    const handleAccept = () => {
        console.log('accepted')
    }
    const handleReject = (rejectionData) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosPublic.patch('/tour-rejection', rejectionData);
                console.log(data)
                if (data?.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: "Rejected!",
                        text: "Tour has been rejected.",
                        icon: "success"
                    });
                }

            }
        })

    }

    const handleStatus = (status) => {
        if (status === 'pending') {
            return "text-yellow-500";
        } else if (status === 'rejected') {
            return "text-red-500";
        } else {
            return 'text-green-500'
        }
    }
    if (isLoading) <span className="loading text-center loading-bars loading-lg"></span>

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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedTours?.map((tour, i) =>
                            <tr key={tour._id}>
                                <th>{i + 1}</th>
                                <td>{tour.packageName}</td>
                                {/* change the email to real tourist name */}
                                <td>{tour.userEmail.split('@')[0]}</td>
                                <td>{new Date(tour.tourDate).toLocaleDateString('en-GB')}</td>
                                <td>{tour.price}</td>
                                <td className={` ${handleStatus(tour?.status)} uppercase font-semibold`}>{tour.status}</td>
                                <td>
                                    {/* TO:DO make sure that the button is also disabled when it is rejected */}
                                    <button disabled={tour.status === 'pending' || tour.status === 'rejected'} onClick={() => {
                                        handleAccept(

                                        )
                                    }}
                                        className="btn btn-sm btn-success mr-2">Accept</button>
                                    <button
                                        disabled={tour.status === 'rejected'}
                                        onClick={() => handleReject(
                                            {
                                                clientEmail: tour?.userEmail, guideEmail: tour?.guideEmail,
                                                packageId: tour?.packageId
                                            }
                                        )} className="btn btn-error btn-sm">Reject</button>

                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedTours;