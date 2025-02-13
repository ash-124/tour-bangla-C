import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const GuideProfile = () => {
    const { email } = useParams();
    const axiosPublic = useAxiosPublic();
    const { data: guide } = useQuery({
        queryKey: [email, 'tour-guide'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/user/${email}`);
            return data;
        }
    })
    console.log(guide);
    return (
        <div className="container mx-auto p-4 mt-16">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                <img
                    src={guide?.photoURL}
                    alt={guide?.name}
                    className="w-32 h-32 mx-auto rounded-full border"
                />
                <h2 className="text-2xl font-bold text-center mt-4">{guide?.name}</h2>
                {/* <p className="text-center text-gray-600">{guide?.bio || "No bio available."}</p> */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Experience:</h3>
                    {/* <p>{guide?.experience || "Not available."}</p> */}
                </div>
                {/* <div className="mt-4">
                    <h3 className="text-lg font-semibold">Reviews:</h3>
                    {guide?.reviews?.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {guide.reviews.map((review, index) => (
                                <li key={index} className="text-gray-700">{review}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default GuideProfile;