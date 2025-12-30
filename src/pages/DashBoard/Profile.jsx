import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';

const Profile = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [isEditMode, setIsEditMode] = useState(false);

    const { data: userData = {}, isLoading, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`user/${user?.email}`);
            return data;
        },
    });

    const { register, handleSubmit } = useForm();

    const handleFormSubmit = async (data) => {
        const updateDoc = { ...data, email: user?.email };
        const { data: updateInfo } = await axiosPublic.patch('/modifyUser', updateDoc);

        if (updateInfo?.modifiedCount) {
            Swal.fire('Profile Updated', 'Your profile has been updated successfully!', 'success');
            setIsEditMode(false);
            refetch();
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <span className="loading loading-spinner loading-lg text-white"></span>
            </div>
        );
    }

    const isTourist = userData?.role === 'tourist';

    return (
        <div className="max-w-xl mx-auto">

            {/* HEADER CARD */}
            <div className="relative bg-gradient-to-r from-[#3A4553] to-[#2B3440] rounded-t-xl p-6 text-center border-2 border-b-0 border-[#BFC1CC]">
                <img
                    src={userData?.photoURL}
                    alt="User"
                    className="w-24 h-24 rounded-full mx-auto border-4 border-[#2B3440] -mb-12 bg-[#2B3440]"
                />
                <h2 className="text-2xl font-semibold text-white mt-14">
                    {userData?.name}
                </h2>
                <p className="text-white/70 text-sm">{userData?.email}</p>
                <span className="badge badge-outline text-white mt-2 capitalize">
                    {userData?.role}
                </span>
            </div>

            {/* BODY CARD */}
            <div className="bg-[#2B3440] border-2 border-[#BFC1CC] border-t-0 rounded-b-xl p-6">

                {/* INFO GRID */}
                {!isEditMode && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-sm mb-6">
                        <div className="p-3 rounded bg-white/5">
                            <p className="text-white/60">Name</p>
                            <p className="font-medium">{userData.name}</p>
                        </div>
                        <div className="p-3 rounded bg-white/5">
                            <p className="text-white/60">Email</p>
                            <p className="font-medium">{userData.email}</p>
                        </div>
                        <div className="p-3 rounded bg-white/5">
                            <p className="text-white/60">Role</p>
                            <p className="font-medium capitalize">{userData.role}</p>
                        </div>
                    </div>
                )}

                {/* EDIT FORM */}
                {isEditMode && (
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mb-6">
                        <div>
                            <label className="block text-white text-sm mb-1">Name</label>
                            <input
                                defaultValue={userData.name}
                                {...register('name')}
                                className="w-full p-2 rounded bg-[#2B3440] border-2 border-[#BFC1CC] text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm mb-1">Photo URL</label>
                            <input
                                defaultValue={userData.photoURL}
                                {...register('photoURL')}
                                className="w-full p-2 rounded bg-[#2B3440] border-2 border-[#BFC1CC] text-white"
                            />
                        </div>

                        <button className="btn btn-success w-full text-white">
                            Save Changes
                        </button>
                    </form>
                )}

                {/* ACTION BUTTONS */}
                {!isEditMode && (
                    <button
                        onClick={() => setIsEditMode(true)}
                        className="btn btn-outline w-full text-white border-white mb-4"
                    >
                        Edit Profile
                    </button>
                )}

                {/* APPLY AS GUIDE */}
                <Link
                    to={isTourist ? '/dashboard/join-tour-guide' : '#'}
                    className={`btn w-full bg-white text-[#BFC1CC] border border-[#BFC1CC]  ${isTourist ? 'btn-primary' : 'btn-disabled'
                        }`}
                >
                    Apply as Tour Guide
                </Link>

                {!isTourist && (
                    <p className="text-xs text-white/60 mt-2 text-center">
                        Only tourists can apply to become a tour guide
                    </p>
                )}
            </div>
        </div>
    );
};

export default Profile;
