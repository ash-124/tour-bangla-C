import { useState } from "react";
import FilterInput from "../../../components/FilterInput";
import SearchInput from "../../../components/SearchInput";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from 'react-hot-toast'
import Swal from "sweetalert2";
const ManageUsers = () => {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const axiosPublic = useAxiosPublic();
    const { data: usersData = [], isLoading, error, refetch } = useQuery({
        queryKey: ["users", search, role],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/users?role=${role}&search=${search}`)
            return data.users
        }
    })
    if (error) {
        toast.error(error.message);
        console.log(error)
    }


    const selectedUsers = usersData || [];
    console.log('selected users', selectedUsers);

    const handleTerminate = (email) => {
        console.log(email)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, terminate!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosPublic.delete(
                        '/user', 
                        { data: { userEmail: email } }
                    );
                    console.log("Delete user data", data)
                    if (data?.deletedCount > 0) {
                        refetch()
                        Swal.fire({
                            title: "Terminated!",
                            text: `${email} has been terminated`,
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }

            }
        });

    }
    return (
        <div>
            <div className="flex flex-col text-center items-center justify-center">
                <h2 className="text-4xl font-semibold my-3">All Users</h2>
                <hr className="text-gray-400 p-3" />

            </div>
            <div className="flex w-11/12 mx-auto justify-between items-center mt-10 mb-2">
                <SearchInput search={search} setSearch={setSearch} />
                <FilterInput role={role} setRole={setRole} />
            </div>
            <div className="mb-10 border border-dashed "></div>

            <div className="overflow-x-auto ">
                <table className="table flex flex-col items-center justify-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>role</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            isLoading
                                ?
                                <div className="flex items-center justify-center text-center">
                                    <span className="loading py-20 loading-dots loading-lg"></span>
                                </div>
                                :
                                selectedUsers?.map((user, i) =>
                                    <tr key={user?._id}>
                                        <th>{i + 1}</th>
                                        <td className="w-20 h-20 "><img className="w-full object-cover h-full rounded-t-lg " src={user?.photoURL} /></td>
                                        <td>{user?.name}</td>
                                        <td>{user?.role}</td>
                                        <td>{user?.email}</td>
                                        <td >
                                            <button onClick={() => { handleTerminate(user?.email) }} className="btn btn-xs btn-error ">Terminate</button>

                                        </td>
                                    </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;