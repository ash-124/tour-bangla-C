import Banner from './Banner';
import TourismContainer from './tourismGuideSection/TourismContainer';
import { GiConfirmed } from "react-icons/gi";
import { PiDetective } from "react-icons/pi";
import { FaHeart, FaHeadset } from "react-icons/fa6";
import FeaturedCard from '../../components/Home/FeaturedCard';
import FeaturedDestinations from '../../components/Home/FeaturedDestinations';
import FunFacts from '../../components/Home/FunFacts';
import WhyChoseUS from '../../components/Home/WhyChoseUS';

const Home = () => {
    const FeaturedCardData = [
        {
            title: 'Best Price Guarantee',
            description: 'A small river named Duden flows by their place and supplies.',
            icon: <GiConfirmed />
        },
        {
            title: 'Customer Loves Us',
            description: 'A small river named Duden flows by their place and supplies.',
            icon: <FaHeart />
        },
        {
            title: 'Best Tour Guides',
            description: 'A small river named Duden flows by their place and supplies.',
            icon: <PiDetective />
        },
        {
            title: '24/7 Support',
            description: 'A small river named Duden flows by their place and supplies.',
            icon: <FaHeadset />
        },
    ]
    return (
        <div>
            <Banner />
            <div className='relative min-h-[50vh] flex items-center justify-center'>
                <div className='  md:absolute -top-10 grid grid-cols-2  md:grid-cols-4  w-11/12 gap-5 items-center justify-center'>
                    {FeaturedCardData.map(card => <FeaturedCard key={card.title} title={card.title} description={card.description} icon={card.icon} />)}
                </div>
            </div>
            <TourismContainer />
            <FeaturedDestinations/>
            <FunFacts/>
            <WhyChoseUS/>
        </div>
    );
};

export default Home;