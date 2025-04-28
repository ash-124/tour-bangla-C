// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SinglePackage from '../../pages/singlePackage/SinglePackage';

export default function FeaturedDestinations() {
    const axiosPublic = useAxiosPublic();
    const {data:featuredPackage=[]} = useQuery(
        {
            queryKey:['featured packages'],
            queryFn: async()=>{
                const {data} = await axiosPublic.get('/featured-packages')
                return data
            }
        }
    )
    console.log("Featured Packages",featuredPackage)
  return (
    <>
      <div className='w-11/12 mx-auto '>
      <h2 className='text-3xl font-bold ml-5 py-5'> Featured Destinations</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[FreeMode, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {featuredPackage?.map(featured =><SwiperSlide> <SinglePackage key={featured._id} pkg={featured} /></SwiperSlide>)}
       
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
      </div>
    </>
  );
}
