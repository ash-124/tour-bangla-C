import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import GuideCard from './GuideCard';

const GuideSection = () => {
    const axiosPublic = useAxiosPublic();

    const { data: guides = [], isLoading } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/tour-guides/?random=true');
            return data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-dots loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map(guide => (
                <GuideCard key={guide._id || guide.name} guide={guide} />
            ))}
        </div>
    );
};

export default GuideSection;
