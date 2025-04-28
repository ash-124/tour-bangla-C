import React from 'react';

const FeaturedCard = ({icon, title, description}) => {
    return (
        <div className='py-10 px-3 shadow-lg flex flex-col text-center gap-5 bg-white border border-[#EA580C] items-center justify-center'>
            {/* icon */}
            <div className='text-3xl font-bold text-[#EA580C]'>{icon}</div>
            {/* title */}
            <div className='text-xl text-black '>{title}</div>
            {/* description */}
            <div className='text-lg text-gray-600'>{description}</div>
        </div>
    );
};

export default FeaturedCard;