import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SweetAlert from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'daisyui/dist/full.css'; // For Daisy UI components

const Profile = () => {
    // TO:DO change userData with real data
    const userData = {
        _id: '679868bed3121c838cd04862',
        name: 'Asraf Aly',
        email: 'asrafaly37@gmail.com',
        photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocJ5N17PD_JJR-4FnBUUwqx31_BjSE…',
        role: 'tourist',
    };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleFormSubmit = (data) => {
        SweetAlert.fire({
            title: 'Profile Updated',
            text: 'Your profile has been updated successfully!',
            icon: 'success',
        });
        setIsEditMode(false);
        console.log(data);
    };

    const handleTourGuideClick = () => {
        navigate('/join-as-tour-guide');
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Welcome, {userData.name}!</h2>

            <div className="mb-4">
                <img src={userData.photoURL} alt="User" className="w-24 h-24 rounded-full" />
            </div>
            <div className="mb-4">
                <strong>Name: </strong>{userData.name}
            </div>
            <div className="mb-4">
                <strong>Email: </strong>{userData.email}
            </div>
            <div className="mb-4">
                <strong>Role: </strong>{userData.role}
            </div>

            {isEditMode ? (
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="input input-bordered"
                            defaultValue={userData.name}
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">Photo URL</label>
                        <input
                            type="text"
                            {...register('photoURL', { required: 'Photo URL is required' })}
                            className="input input-bordered"
                            defaultValue={userData.photoURL}
                        />
                        {errors.photoURL && <span className="text-red-500">{errors.photoURL.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full">Save Changes</button>
                </form>
            ) : (
                <button onClick={handleEditClick} className="btn btn-secondary w-full">Edit Profile</button>
            )}

            <div className="mt-6">
                <button
                    onClick={handleTourGuideClick}
                    className="btn btn-success w-full"
                >
                    Apply for Tour Guide
                </button>
            </div>
        </div>
    );
};

export default Profile;
