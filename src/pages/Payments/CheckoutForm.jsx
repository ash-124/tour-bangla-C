import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";


const CheckoutForm = ({booking}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState()
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        // const card = elements.getElement(CardElement);
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

    }
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
            <button type="submit" disabled={!stripe} className="btn w-full bg-gray-300 hover:bg-gray-400 text-gray-900 border-none rounded-md">
                Pay ৳ {booking?.price}
            </button>
        </form>

    );
};

export default CheckoutForm;
{/* Stripe CardElement here */ }
{/* <div className="bg-white rounded-md px-3 py-4">
                <p className="text-gray-400 text-sm">
                    Card input field (Stripe)
                </p>
            </div> */}