import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [transactionID, setTransactionID] = useState(" ")
    const [error, setError] = useState(" ")
    const { user } = useAuth()
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const {
        data: clientSecret,
        isClientSecretLoading,
        isError,
    } = useQuery({
        queryKey: ["payment-intent", booking?._id],
        enabled: !!booking?.price && !!user?.email, // 🔥 KEY LINE
        queryFn: async () => {
            const res = await axiosPublic.post("/create-payment-intent", {
                bookingId: booking._id,
                price: booking.price,
            });
            return res.data.clientSecret;
        },
        staleTime: Infinity, // 🚨 VERY IMPORTANT
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError(" ")
        }
        //  confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })
        if (confirmError) {
            setError(confirmError.message);
            console.log('confirmError', confirmError)
        } else {
            setError(" ");
            console.log("Payment intent", paymentIntent)
            if (paymentIntent.status === "succeeded") {
                const paymentData = {
                    bookingId: booking._id,
                    packageName: booking.packageName,
                    transactionId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    userEmail: user?.email,
                    date: new Date()
                }
                const { data } = await axiosPublic.patch('/successful-payment', paymentData)
                if (data?.success === true && data?.changeStatus.modifiedCount) {
                    toast.success()
                    Swal.fire({
                        icon: "success",
                        title: `${paymentIntent.amount} Paid Successfully`,
                        showConfirmButton: false,
                        timer: 1200
                    });
                    
                    console.log("[save paid data]", data)
                    // navigate to the bookings page
                    navigate('/dashboard/my-bookings')

                }
                setTransactionID(paymentIntent.id);
            }
        }

    }
    console.log("client_secret_from_intent", { clientSecret, isClientSecretLoading, isError })

    return (
        <form className="space-y-5 " onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '14px',
                            color: '#111',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {error && <span className="text-red-600 text-xs">{error}</span>}
            {transactionID && <span className="text-emerald-600 text-xs"> Transaction ID:{transactionID}</span>}
            <button type="submit" disabled={!stripe || !clientSecret } className="btn w-full bg-gray-300 hover:bg-gray-400 text-gray-900 border-none rounded-md">
                Pay ৳ {booking?.price}
            </button>
        </form>

    );
};

export default CheckoutForm;
