import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const Payments = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: booking = {}, isLoading, refetch } = useQuery({
        queryKey: [user?.email, 'bookingPackage'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/booking/${id}`);
            return data;
        }
    })

    if (isLoading) {
        return (
            <div className='flex items-center justify-center p-10'>
                <span className="loading loading-bars loading-lg"></span>

            </div>
        )
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-xl bg-slate-800 rounded-xl shadow-xl border border-slate-700">

                {/* Title */}
                <div className="px-6 py-5 border-b border-slate-700">
                    <h2 className="text-center text-xl font-semibold tracking-wide text-gray-200 uppercase">
                        Complete Payment
                    </h2>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">

                    {/* Booking Info */}
                    <div className="space-y-1 text-gray-300 text-sm">
                        <p>
                            <span className="font-medium text-gray-400">
                                Package:
                            </span>{" "}
                            {booking?.packageName}
                        </p>
                        <p>
                            <span className="font-medium text-gray-400">
                                Tour Date:
                            </span>{" "}
                            {new Date(booking?.tourDate).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-medium text-gray-400">
                                Guide:
                            </span>{" "}
                            {booking?.guideName}
                        </p>
                        <p>
                            <span className="font-medium text-gray-400">
                                Guide:
                            </span>{" "}
                            {booking?.guideEmail}
                        </p>
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between items-center bg-slate-700/40 rounded-lg px-4 py-3">
                        <span className="text-gray-300 font-medium">
                            Total Amount
                        </span>
                        <span className="text-lg font-semibold text-white">
                            ৳ {booking?.price}
                        </span>
                    </div>

                    {/* Card Input */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">
                            Card Details
                        </label>
                        <div className="bg-white rounded-md px-3 py-4">
                            {/* Stripe CardElement here */}
                            <p className="text-gray-400 text-sm">
                                Card input field (Stripe)
                            </p>
                        </div>
                    </div>

                    {/* Pay Button */}
                    <button className="btn w-full bg-gray-300 hover:bg-gray-400 text-gray-900 border-none rounded-md">
                        Pay ৳ {booking?.price}
                    </button>

                    {/* Security Note */}
                    <p className="text-xs text-center text-gray-400">
                        🔒 Secure payment processed via Stripe
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Payments;



