
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
const ReviewCardSwiper = ({ reviews }) => {
    return (

        <div className='w-full'>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper w-[400px] rounded py-5"
            >
                {reviews.map(review => <SwiperSlide key={review.review}>
                    <div className='grid grid-cols-4 rounded ' >
                        {/* card img */}
                        <div className='col-span-1 rounded-full w-full '>
                            <img className='object-cover' src={review.image} alt='' />
                        </div >
                        {/* contents */}
                        <div className='col-span-3'>{review.review}</div>
                    </div>
                </SwiperSlide>

                )}
            </Swiper>
        </div>
    );
}

export default ReviewCardSwiper;