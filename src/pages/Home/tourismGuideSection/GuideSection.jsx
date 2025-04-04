import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import GuideCard from './GuideCard';

const GuideSection = () => {
    const axiosPublic = useAxiosPublic();
    const { data: guides, isLoading } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/tour-guides/?random=true')
            return data;

        }
    })
    if (isLoading) {
        return <div className='text-center mt-20'> <span className="loading loading-dots loading-xl"></span>
        </div>
    }
    return (
        <div className=' flex justify-center items-center my-5 w-11/12 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 '>
                {guides?.map(guide => <GuideCard key={guide?.name} guide={guide} />)}
            </div>
        </div>
    );
};

export default GuideSection;