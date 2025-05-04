import { useState } from "react";
import FilterInput from "../../../components/FilterInput";
import SearchInput from "../../../components/SearchInput";
import useUsers from "../../../Hooks/useUsers";

const ManageUsers = () => {
    const { users, isLoading, error } = useUsers();
    const [query, setQuery] = useState();
    const [filter, setFilter] = useState();
    // TO:DO create search & filter functionality
    console.log({filter, query})
    return (
        <div>
            <div className="flex flex-col text-center items-center justify-center">
                <h2 className="text-4xl font-semibold my-3">All Users</h2>
                <hr className="text-gray-400 p-3" />

            </div>
            <div className="flex w-11/12 mx-auto justify-between items-center mt-10 mb-2">
                <SearchInput setQuery={setQuery} />
                <FilterInput  setFilter={setFilter}/>
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
                        {users?.users.map((user, i) =>
                            <tr key={user?._id}>
                                <th>{i + 1}</th>
                                <td className="w-20 h-20 "><img className="w-full object-cover h-full rounded-t-lg " src={user?.photoURL} /></td>
                                <td>{user?.name}</td>
                                <td>{user?.role}</td>
                                <td>{user?.email}</td>
                                <td className="flex">
                                    <button onClick={() => { handleAccept(user?.applicantEmail) }} className="btn btn-xs text-white btn-success mr-2">Accept</button>
                                    <button onClick={() => handleReject(user?._id)} className="btn btn-xs btn-error text-white ">Reject</button>

                                </td>
                            </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;