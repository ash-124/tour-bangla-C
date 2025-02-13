import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTourGuide = () => {
    const axiosPublic = useAxiosPublic();
    const {data : tourGuides, isLoading, error} = useQuery({
        queryKey:['tour-guide'],
        queryFn: async ()=>{
            const {data} = await axiosPublic.get('/tour-guides');
            return data 
        }
    })
    return [tourGuides, isLoading, error];
};

export default useTourGuide;