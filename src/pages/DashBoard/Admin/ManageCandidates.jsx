import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageCandidates = () => {
    const axiosPublic = useAxiosPublic();
    const { data: applicants = [], isLoading, refetch } = useQuery({
        queryKey: ['applicants'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('applicants');
            return data;
        }
    })
    console.log({ applicants });
    if (isLoading) <span className="loading loading-bars loading-lg text-blue-900"></span>
    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosPublic.post('applicant/?reject=true', { id });
                console.log(data)
                if (data?.rejectionCount) {
                    Swal.fire({
                        title: "Rejected!",
                        text: "Candidate has been rejected.",
                        icon: "success"
                    });
                    refetch();
                }
            }

        });

    }
    const handleAccept = (email) => {
        console.log('Accepted', email)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Tour Guide"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosPublic.post('applicant', { applicantEmail: email });
                console.log(data)
                if (data?.acceptationCount) {
                    Swal.fire({
                        title: "Accepted!",
                        text: "Candidate has been upgraded to Tour Guide.",
                        icon: "success"
                    });
                    refetch();
                }
            }

        });
    }
    return (
        <div>
            <div className="flex flex-col text-center items-center justify-center">
                <h2 className="text-4xl font-semibold my-3">Tour Guide Candidates</h2>
                <hr className="text-gray-400 p-3" />

            </div>
            <div className="overflow-x-auto ">
                <table className="table flex flex-col items-center justify-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {applicants.map((candidate, i) =>
                            <tr key={candidate?._id}>
                                <th>{i + 1}</th>
                                <td>{candidate?.applicantData?.name}</td>
                                <td>{candidate?.applicantEmail}</td>
                                <td>
                                    <button onClick={() => { handleAccept(candidate?.applicantEmail) }} className="btn btn-success mr-2">Accept</button>
                                    <button onClick={() => handleReject(candidate?._id)} className="btn btn-error">Reject</button>

                                </td>
                            </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCandidates;