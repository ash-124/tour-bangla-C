import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Package from './Package';
import GuideSection from './GuideSection';
const TourismContainer = () => {
    return (
        <div className='my-20'>
            <Tabs>
                <TabList className={'text-center'}>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>
                <TabPanel>
                    <Package/>
                </TabPanel>
                <TabPanel>
                    <GuideSection/>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TourismContainer;