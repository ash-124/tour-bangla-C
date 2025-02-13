import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useRole = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const { data: role = {} } = useQuery({
        queryKey: [user?.email, 'role'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`role-type/?email=${user?.email}`)
            return data;
        }
    })
    return role
};

export default useRole;