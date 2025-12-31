import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes } from 'react-icons/fa';
import TableContainer from '../../../components/TableContainer';

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
    const theads = ['#','Package','Guide','Date','Price','Status', 'Action']
    console.log('[my assigned tours ]', assignedTours)
    if (isLoading) <span className="loading text-center loading-bars loading-lg"></span>

    return (
        <div className="w-full ">
            <div className="bg-[#2B3440] border-2 border-[#BFC1CC] rounded-lg shadow-md p-2 md:p-6">
                <h2 className="text-xl font-semibold text-white mb-4 text-center">
                    My Assigned Tours
                </h2>
                <TableContainer theads={theads } data={ assignedTours} refetch={refetch} />

            </div>
        </div>
    );
};

export default AssignedTours;