import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ booking }) => {
    // Stripe hooks
    const stripe = useStripe();
    const elements = useElements();

    // Auth & utils
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // UI states
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    // Only allow payment if booking is pending
    const isPayable = booking?.status === "pending";

    /* ---------------------------------------------------
       CREATE PAYMENT INTENT (ONLY WHEN PAYMENT IS ALLOWED)
    --------------------------------------------------- */
    const { data: clientSecret, isLoading } = useQuery({
        queryKey: ["payment-intent", booking?._id],
        enabled: !!booking?.price && !!user?.email && isPayable,
        queryFn: async () => {
            const {data} = await axiosPublic.post("/create-payment-intent", {
                bookingId: booking._id,
                price: booking.price,
            });
            return data.clientSecret;
        },
        staleTime: Infinity, // prevent re-creating intent
    });

    /* ---------------------------------------------------
       HANDLE STRIPE PAYMENT SUBMIT
    --------------------------------------------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Safety checks
        if (!stripe || !elements || !clientSecret) return;

        setProcessing(true);
        setError("");

        const card = elements.getElement(CardElement);
        if (!card) {
            setProcessing(false);
            return;
        }
        // Confirm payment with Stripe
        const { paymentIntent, error } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.displayName || "anonymous",
                        email: user?.email,
                    },
                },
            }
        );
        
        console.log("[clientSecret, paymentIntent]", {clientSecret, paymentIntent})
        // Stripe error
        if (error) {
            setError(error.message);
            setProcessing(false);
            return;
        }

        // Payment success
        if (paymentIntent.status === "succeeded") {
            const paymentData = {
                bookingId: booking._id,
                transactionId: paymentIntent.id,
                amount: paymentIntent.amount,
                userEmail: user.email,
                packageName:booking.packageName
            };

            // Save payment & update booking status
            const { data } = await axiosPublic.patch(
                "/successful-payment",
                paymentData
            );
            console.log('savePayment response',data)
            if (data?.success) {
                // Invalidate booking query to refetch updated status
                await queryClient.invalidateQueries({
                    queryKey: ["booking", booking._id],
                });

                Swal.fire({
                    icon: "success",
                    title: `৳${paymentIntent.amount / 100} Paid Successfully`,
                    showConfirmButton: false,
                    timer: 1200,
                });

                navigate("/dashboard/my-bookings");
            }
        }

        setProcessing(false);
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Stripe Card Input */}
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "14px",
                            color: "#111",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />

            {/* Error message */}
            {error && <p className="text-red-600 text-xs">{error}</p>}

            {/* Payment completed message */}
            {!isPayable && (
                <p className="text-emerald-600 text-sm text-center">
                    ✅ Payment already completed
                </p>
            )}

            {/* Pay button */}
            <button
                type="submit"
                disabled={
                    !stripe ||
                    !clientSecret ||
                    processing ||
                    !isPayable ||
                    isLoading
                }
                className="btn w-full bg-gray-300 hover:bg-gray-400 text-gray-900 border-none rounded-md"
            >
                {processing ? "Processing..." : `Pay ৳ ${booking?.price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
