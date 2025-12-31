import Swal from 'sweetalert2';
import { FaTimes, FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const TableRow = ({ pkg, i, refetch }) => {
    const {
        _id,
        packageId,
        userEmail,
        packageName,
        guideName,
        tourDate,
        price,
        status
    } = pkg || {};
    const axiosPublic = useAxiosPublic();

    const handleAccept = (acceptedData) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: " Accept It"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosPublic.patch('/tour-accepted', acceptedData);
                console.log("[Tour Accepted", data)
                if (data?.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: "Accepted",
                        text: "Tour has been accepted",
                        icon: "success"
                    });
                }

            }
        })

    }

    const handleReject = (rejectionData) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosPublic.patch('/tour-rejection', rejectionData);
                console.log(data)
                if (data?.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: "Rejected!",
                        text: "Tour has been rejected.",
                        icon: "success"
                    });
                }

            }
        })

    }


    return (
        <tr className='text-xs md:text-sm'>
            <th>{i + 1}</th>

            <td className="whitespace-normal ">
                {packageName}
            </td>

            <td className="text-xs">
                {userEmail}
            </td>

            <td className="text-xs">
                {new Date(tourDate).toLocaleDateString('en-GB')}
            </td>

            <td>${price}</td>

            <td>
                <span
                    className={`badge badge-sm uppercase text-xs text-white ${status === "pending"
                        ? "badge-warning"
                        : status === "rejected"
                            ? "badge-error"
                            : "badge-success"
                        }`}
                >
                    {status == 'in-review' ? status.split('-')[1] : status}
                </span>
            </td>

            <td>
                <div className="flex  items-center gap-1">
                    {/* Accept */}
                    <button
                        onClick={() => handleAccept({
                            clientEmail: pkg?.userEmail,
                            guideEmail: pkg?.guideEmail,
                            packageId: pkg?.packageId
                        })}
                        disabled={status !== 'in-review'}
                        className="btn btn-xs btn-success text-white"
                        title="Accept"
                    >
                        <FaCheck className='text-white' />
                    </button>

                    {/* Reject */}
                    {status === 'pending' && (
                        <button
                            onClick={() => handleReject(
                                {
                                    clientEmail: pkg?.userEmail,
                                    guideEmail: pkg?.guideEmail,
                                    packageId: pkg?.packageId
                                }
                            )}
                            className="btn btn-xs btn-error"
                            title="Cancel"
                        >
                            <FaTimes className='text-white' />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default TableRow;
