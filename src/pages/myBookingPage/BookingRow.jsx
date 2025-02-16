import React from 'react';

const BookingRow = ({ pkg, i }) => {
    const  { packageName, guideName, tourDate, price, status}= pkg;
    const handleCancelBooking =() =>{
        console.log('cancelled')
    }
    const handlePayment =() =>{
        console.log('pay with Stripe');
    }
    return (
        <>
            <tr >
                <th>{i + 1}</th>
                <td>{packageName}</td>
                <td>{guideName}</td>
                <td>{tourDate}</td>
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