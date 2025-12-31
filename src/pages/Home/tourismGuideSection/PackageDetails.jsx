import { useQuery } from '@tanstack/react-query';
import  { useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import ModalImage from 'react-modal-image';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import useTourGuide from '../../../Hooks/useTourGuide';
const PackageDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const { user } = useAuth();
    const [tourGuides, isLoading, error] = useTourGuide();
    const [tourDate, setTourDate] = useState(new Date());
    const [selectedGuide, setSelectedGuide] = useState(null);
    const navigate = useNavigate();
    const { data: packageData = {} } = useQuery({
        queryKey: ['singlePackage'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/package/${id}`);
            return data;
        }
    })
    const handleSelectedTourGuide = (e) =>{
        const name = e.target.value;
        const email = e.target.selectedOptions[0].dataset.email;
        setSelectedGuide({name, email})
        console.log({name, email})
    }
    const handleBooking = async () => {
        if (!tourDate || !selectedGuide) {
            toast.error("Please select a tour date and guide.");
            return;
        }

        const bookingData = {
            packageId: packageData._id,
            userEmail: user.email,
            packageName: packageData.name,
            price: packageData.price,
            tourDate,
            guideName: selectedGuide?.name,
            guideEmail: selectedGuide?.email,
            status: "pending",
        };
        try {
            const { data } = await axiosPublic.post('/booking', bookingData);
            if (data?.insertedId) {
                toast.success(`The tour package ${packageData?.name} booked successfully`)
            }
            navigate('/dashboard/my-bookings')
        } catch (error) {
            console.log(error);
            toast.error(error.response.message);
        }

    }
    
    return (

        <div className="container mx-auto p-4 mt-16">
            {/* Gallery Section */}
            <div className="mb-8">
                <div className="grid grid-cols-3 gap-4 min-h-screen">
                    {packageData?.images?.map((img, index) => (
                        <div key={index}>
                            <ModalImage
                                small={img} // The thumbnail image
                                large={img} // The large image to show in the modal
                                alt={`Gallery ${index + 1}`}
                                className="cursor-pointer rounded-lg"
                            />
                        </div>
                    ))}

                </div>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Title */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {packageData.name}
                        </h1>
                        <p className="text-gray-500 mt-1">{packageData.duration}</p>
                    </div>

                    {/* About */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">About the Tour</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {packageData.description}
                        </p>
                    </div>

                    {/* Itinerary */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Tour Plan</h2>
                        <ul className="space-y-2">
                            {packageData.itinerary?.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="bg-gray-50 border rounded-lg p-3 text-gray-700"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Guides */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Available Guides</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {tourGuides?.map((guide) => (
                                <div
                                    key={guide._id}
                                    onClick={() =>
                                        navigate(`/guide-profile/${guide.email}`)
                                    }
                                    className="cursor-pointer bg-white border rounded-xl p-4 text-center hover:shadow-md transition"
                                >
                                    <img
                                        src={guide.photoURL}
                                        alt={guide.name}
                                        className="w-16 h-16 mx-auto rounded-full mb-2 object-cover"
                                    />
                                    <p className="font-medium">{guide.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT BOOKING CARD */}
                <div className="lg:sticky lg:top-24 h-fit">
                    <div className="bg-white border rounded-2xl shadow-lg p-6 space-y-4">
                        <div className="text-center">
                            <p className="text-gray-500">Price</p>
                            <p className="text-3xl font-bold text-orange-500">
                                ৳{packageData.price}
                            </p>
                        </div>

                        <div>
                            <DatePicker
                                selected={tourDate}
                                onChange={(date) => setTourDate(date)}
                                minDate={new Date()}
                                placeholderText="Select tour date"
                                className="input input-bordered w-full"
                            />


                        </div>
                        <select
                            className="select select-bordered w-full"
                            defaultValue=""
                            onChange={(e) =>
                                setSelectedGuide({
                                    name: e.target.value,
                                    email: e.target.selectedOptions[0].dataset.email,
                                })
                            }
                        >
                            <option disabled value="">
                                Select Tour Guide
                            </option>
                            {tourGuides?.map((guide) => (
                                <option
                                    key={guide._id}
                                    value={guide.name}
                                    data-email={guide.email}
                                >
                                    {guide.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleBooking}
                            className="btn btn-primary w-full"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;