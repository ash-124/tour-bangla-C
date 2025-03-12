import { useWindowScroll } from "react-use";
import {motion} from 'motion/react';
const ScroolAnimation = () => {
    const { y } = useWindowScroll();
    const scrollingPercentage = Math.floor(
        (y / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
          console.log(scrollingPercentage);
    return (
        // <div
        //     className="fixed top-0 left-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out"
        //     style={{ width: `${scrollingPercentage}%` }}
        // />
        <div className="relative w-full h-[100vh] flex flex-col items-center justify-center space-y-16">
            <div className="relative bg-white shadow-lg p-6 rounded-lg w-[300px] border border-gray-300">
                <p className="text-gray-800 font-semibold">Complete your profile by including your personal details.</p>
            </div>

            <div className="relative w-[4px] h-[200px] bg-gray-300 overflow-hidden">
                <div 
                style={{ height: `${scrollingPercentage}%` }}
                 className={`absolute top-0 left-0 w-full  bg-gradient-to-b from-blue-200 to-blue-900 transition-all duration-300`}></div>
            </div>

            <div className="relative bg-white shadow-lg p-6 rounded-lg w-[300px] border border-gray-300">
                <p
                animate={{
                    x:40,

                }} 
                transition={{
                    delay:1,
                    duration:2,
                }}
                 className="text-gray-800 font-semibold">Apply to your desired tuition jobs every day.</p>
            </div>
        </div>

    );
};

export default ScroolAnimation;