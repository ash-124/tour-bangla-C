

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import {  Pagination, Navigation, Autoplay } from 'swiper/modules';
const ReviewCardSwiper = ({ reviews }) => {
    return (

        <div >
            <Swiper
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay, Navigation,]}
                className="mySwiper w-[400px] "
                
                navigation={true}


            >
                {reviews.map(review => <SwiperSlide key={review.review}>
                    <div className='grid grid-cols-5 bg-white text-black gap-3 rounded-xl p-7  ' >
                        {/* card img */}
                        <div className='col-span-2 h-2/3 '>
                            <img className='object-cover bg-[#F97316] p-1  w-full h-full  '
                                src={review.image} alt=''
                                style={{
                                    borderRadius: '50%',
                                }}
                            />
                        </div >
                        {/* contents */}
                        <div className='col-span-3 flex flex-col justify-between text-sm '>
                            <p className='text-gray-500'>
                                {review.review.slice(0, 150)}....
                            </p>
                            <p className='font-bold'>
                                {review.name}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>

                )}
            </Swiper>
        </div>
    );
}

export default ReviewCardSwiper;