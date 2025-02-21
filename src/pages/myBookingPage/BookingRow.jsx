import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const BookingRow = ({ pkg, i, refetch }) => {
    const { packageId, userEmail, packageName, guideName, tourDate, price, status } = pkg;
    const axiosPublic = useAxiosPublic();

    const handleCancelBooking = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancelled it"
        }).then(async (result) => {
            const cancelData = { packageId, email: userEmail }
            console.log('cancel data before request', cancelData)
            if (result.isConfirmed) {
                const { data } = userEmail && await axiosPublic.delete('/cancel-booking', {
                    data: cancelData,
                    headers: { "Content-Type": "application/json" }
                })
                console.log(data);
                refetch();
                if (data?.deletedCount) {
                    Swal.fire({
                        title: "Cancelled!",
                        text: "Your tour has been cancelled .",
                        icon: "success"
                    });
                }

            }
        });


    }
    const handlePayment = () => {
        console.log('pay with Stripe');
    }
    return (
        <>
            <tr >
                <th>{i + 1}</th>
                <td>{packageName}</td>
                <td>{guideName}</td>
                <td>{new Date(tourDate).toLocaleDateString('en-GB')}</td>
                <td>{price}</td>
                <td>{status}</td>
                <td className='flex items-center gap-3'>
                    <button onClick={handlePayment} disabled={status !== 'pending'} className="btn btn-info">{status === 'in-review' ? ' Paid' : 'Pay'}</button>
                    {
                        status === 'pending' && <button onClick={handleCancelBooking} className="btn btn-warning">Cancel</button>
                    }
                </td>
            </tr>

        </>
    );
};

export default BookingRow;