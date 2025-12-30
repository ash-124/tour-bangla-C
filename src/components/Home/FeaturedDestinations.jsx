// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SinglePackage from '../../pages/singlePackage/SinglePackage';

export default function FeaturedDestinations() {
  const axiosPublic = useAxiosPublic();
  const { data: featuredPackage = [] } = useQuery(
    {
      queryKey: ['featured packages'],
      queryFn: async () => {
        const { data } = await axiosPublic.get('/featured-packages')
        return data
      }
    }
  )
  console.log("Featured Packages", featuredPackage)
  return (
    <>
      <div className='w-11/12 mx-auto '>
        <h2 className='text-3xl font-bold ml-5 py-5'> Featured Destinations</h2>
        <Swiper
          spaceBetween={10}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[FreeMode, Pagination, Navigation, Autoplay]}
          breakpoints={
            {
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              }
            }
          }
          className="mySwiper"
        >
          {featuredPackage?.map(featured => <SwiperSlide key={featured._id}> <SinglePackage pkg={featured} /></SwiperSlide>)}

          

        </Swiper>
      </div>
    </>
  );
}
