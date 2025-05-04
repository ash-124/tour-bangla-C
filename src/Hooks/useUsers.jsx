import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
    const axiosPublic = useAxiosPublic();
    const {data = {}, isLoading, error} = useQuery({
        queryKey:['users'],
        queryFn:async ()=>{
            const {data} = await axiosPublic.get('/users');
            return data;
        }
    })
    return ( {users:data.users || [], isLoading, error});
};

export default useUsers;