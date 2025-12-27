import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { FaTimes, FaCreditCard } from "react-icons/fa";

const BookingRow = ({ pkg, i, refetch }) => {
  const {
    packageId,
    userEmail,
    packageName,
    guideName,
    tourDate,
    price,
    status
  } = pkg;

  const axiosPublic = useAxiosPublic();

  const handleCancelBooking = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosPublic.delete('/cancel-booking', {
          data: { packageId, email: userEmail },
          headers: { "Content-Type": "application/json" }
        });

        if (data?.deletedCount) {
          refetch();
          Swal.fire("Cancelled!", "Your tour has been cancelled.", "success");
        }
      }
    });
  };

  const handlePayment = () => {
    console.log('pay with Stripe');
  };

  return (
    <tr>
      <th>{i + 1}</th>

      <td className="whitespace-normal ">
        {packageName}
      </td>

      <td className="text-xs">
        {guideName}
      </td>

      <td className="text-xs">
        {new Date(tourDate).toLocaleDateString('en-GB')}
      </td>

      <td>${price}</td>

      <td>
        <span
          className={`badge badge-sm uppercase text-xs text-white ${
            status === "pending"
              ? "badge-warning"
              : status === "rejected"
              ? "badge-error"
              : "badge-success"
          }`}
        >
          {status}
        </span>
      </td>

      <td>
        <div className="flex flex-wrap items-center gap-1">
          {/* Pay */}
          <button
            onClick={handlePayment}
            disabled={status !== 'pending'}
            className="btn btn-xs btn-success"
            title="Pay"
          >
            <FaCreditCard />
          </button>

          {/* Cancel */}
          {status === 'pending' && (
            <button
              onClick={handleCancelBooking}
              className="btn btn-xs btn-error"
              title="Cancel"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default BookingRow;
