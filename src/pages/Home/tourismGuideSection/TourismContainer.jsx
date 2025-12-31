import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Package from './Package';
import GuideSection from './GuideSection';
import { Link } from 'react-router-dom';

const TourismContainer = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-14">
            {/* Section Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Discover With Tour Bangla
                </h2>
                <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
                    Choose from curated travel packages or meet our experienced tour guides.
                </p>
            </div>

            <Tabs>
                {/* Tabs */}
                <TabList className="flex justify-center gap-4 border-b border-slate-200 mb-8">
                    <Tab
                        className="cursor-pointer px-4 py-2 text-sm md:text-base font-medium text-slate-500 focus:outline-none"
                        selectedClassName="text-[#FF7A18] border-b-2 border-[#FF7A18]"
                    >
                        Our Packages
                    </Tab>
                    <Tab
                        className="cursor-pointer px-4 py-2 text-sm md:text-base font-medium text-slate-500 focus:outline-none"
                        selectedClassName="text-[#FF7A18] border-b-2 border-[#FF7A18]"
                    >
                        Meet Our Tour Guides
                    </Tab>
                </TabList>

                {/* Packages */}
                <TabPanel>
                    <div className='flex items-center justify-center'>
                        <Package />
                    </div>

                    <div className="flex justify-center mt-10">
                        <Link
                            to="/packages"
                            className="inline-flex items-center justify-center rounded-full bg-[#FF7A18] px-6 py-3 text-white font-medium hover:bg-orange-600 transition"
                        >
                            See All Packages
                        </Link>
                    </div>
                </TabPanel>

                {/* Guides */}
                <TabPanel>
                    <div className='flex items-center justify-center'>
                    <GuideSection />

                    </div>
                </TabPanel>
            </Tabs>
        </section>
    );
};

export default TourismContainer;
