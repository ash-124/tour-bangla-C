import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Package from './Package';
import GuideSection from './GuideSection';
import { Link } from 'react-router-dom';
const TourismContainer = () => {
    return (
        <div className='my-20'>
            <Tabs>
                <TabList className={'text-center'}>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>
                <TabPanel>
                    <Package />
                    <Link to={'/packages'}><div className=' w-full btn text-center'> See all Packages</div></Link>
                </TabPanel>
                <TabPanel>
                    <GuideSection />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TourismContainer;