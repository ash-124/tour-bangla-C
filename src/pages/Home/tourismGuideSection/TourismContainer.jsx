import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Package from './Package';
import GuideSection from './GuideSection';
import { Link } from 'react-router-dom';
const TourismContainer = () => {
    return (
        <div className='my-20'>
            <Tabs>
                <TabList className={'text-center '}>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>
                <TabPanel className={'flex items-center justify-center '}>
                    <div>
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