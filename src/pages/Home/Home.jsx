import React from 'react';
import Banner from './Banner';
import TourismContainer from './tourismGuideSection/TourismContainer';
import ScroolAnimation from './ScroolAnimation';

const Home = () => {
    return (
        <div>
           <Banner/>
           <TourismContainer/>
           <ScroolAnimation/>
        </div>
    );
};

export default Home;