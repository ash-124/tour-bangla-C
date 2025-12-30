import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Package from './Package';
import GuideSection from './GuideSection';
import { Link } from 'react-router-dom';
const TourismContainer = () => {
    return (
        <div className='mb-10'>
            <Tabs>
                <TabList className={'text-center '}>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>
                <TabPanel >
                    <div className={'flex flex-col items-center justify-center '}>
                        <Package />
                        <Link to={'/packages'}><div className=' btn-prime rounded-none  w-full text-center mt-5'> See all Packages</div></Link>
                    </div>
                </TabPanel>
                <TabPanel>
                    <GuideSection />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TourismContainer;