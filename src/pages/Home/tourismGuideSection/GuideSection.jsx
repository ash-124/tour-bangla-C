import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import GuideCard from './GuideCard';

const GuideSection = () => {
    const axiosPublic = useAxiosPublic();
    const { data: guides } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/tour-guides/?random=true')
            return data;

        }
    })
    console.log(guides)
    return (
        <div className=' flex justify-center items-center my-5'>
            <div className='grid grid-cols-4 gap-6 '>
                {guides?.map(guide => <GuideCard guide={guide} />)}
            </div>
        </div>
    );
};

export default GuideSection;