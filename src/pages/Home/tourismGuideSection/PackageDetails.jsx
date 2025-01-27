import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import ModalImage from 'react-modal-image';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';

const PackageDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const { user } = useAuth();
    const [tourDate, setTourDate] = useState(null);
    console.log('id from details page', id)
    const { data: packageData = {} } = useQuery({
        queryKey: ['singlePackage'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/package/${id}`);
            return data;
        }
    })
    console.log(packageData);
    const handleBooking = () => {
        if (!tourDate ) {
            toast.error("Please select a tour date and guide.");
            return;
        }

        const bookingData = {
            packageId: packageData._id,
            userEmail: user.email,
            packageName: packageData.name,
            price: packageData.price,
            tourDate,
            // guideName: selectedGuide,
            status: "pending",
        };
        console.log(bookingData)
    }
    return (

        <div className="container mx-auto p-4 mt-16">
            {/* Gallery Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-3 gap-4 min-h-screen">
                    {packageData?.images?.map((img, index) => (
                        <div  key={index}>
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

            {/* About The Tour Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About The Tour</h2>
                <p>{packageData?.description}</p>
            </div>

            {/* Tour Plan Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tour Plan</h2>
                <ul className="list-disc pl-6">
                    {packageData.itinerary && packageData?.itinerary.map((item, index) => (
                        <li key={index} className="mb-2">
                            <strong> {item} </strong>
                            
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tour Guides Section */}
            {/* <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tour Guides</h2>
        <div className="grid grid-cols-3 gap-4">
          {guides.map((guide) => (
            <div
              key={guide._id}
              className="cursor-pointer border p-4 rounded-lg text-center"
              onClick={() => navigate(`/guide/${guide._id}`)}
            >
              <img
                src={guide.image}
                alt={guide.name}
                className="w-20 h-20 mx-auto rounded-full mb-2"
              />
              <p>{guide.name}</p>
            </div>
          ))}
        </div>
      </div> */}

            {/* Booking Form */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Book Your Tour</h2>
                <form className="grid grid-cols-1 gap-4 max-w-lg">
                    <input
                        type="text"
                        value={packageData.name}
                        readOnly
                        className="p-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        value={user?.displayName || "Guest"}
                        readOnly
                        className="p-2 border rounded-lg"
                    />
                    <input
                        type="email"
                        value={user?.email || "Not Available"}
                        readOnly
                        className="p-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        value={user?.photoURL || "No Image"}
                        readOnly
                        className="p-2 border rounded-lg"
                    />
                    <input
                        type="number"
                        value={packageData.price}
                        readOnly
                        className="p-2 border rounded-lg"
                    />
                    <DatePicker
                        selected={tourDate}
                        onChange={(date) => setTourDate(date)}
                        placeholderText="Select Tour Date"
                        className="p-2 border rounded-lg w-full"
                    />
                    {/* TO:DO make guides */}
                    {/* <select
                        value={selectedGuide}
                        onChange={(e) => setSelectedGuide(e.target.value)}
                        className="p-2 border rounded-lg"
                    >
                        <option value="" disabled>
                            Select Tour Guide
                        </option>
                        {guides.map((guide) => (
                            <option key={guide._id} value={guide.name}>
                                {guide.name}
                            </option>
                        ))}
                    </select> */}
                    <button
                        type="button"
                        onClick={handleBooking}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    >
                        Book Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PackageDetails;