import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SinglePackage from '../../pages/singlePackage/SinglePackage';

export default function FeaturedDestinations() {
  const axiosPublic = useAxiosPublic();
  const { data: featuredPackages = [], isLoading, isError } = useQuery({
    queryKey: ['featured-packages'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/featured-packages');
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full text-center py-10 text-[#64748B]">
        Loading featured destinations...
      </div>
    );
  }

  if (isError || !featuredPackages.length) {
    return (
      <div className="w-full text-center py-10 text-[#64748B]">
        No featured destinations available at the moment.
      </div>
    );
  }

  return (
    <section className="py-10 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0F172A]">
          Featured Destinations
        </h2>

        {/* Swiper Wrapper */}
        <div className="relative">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 25 },
            }}
            className="px-10"
          >
            {featuredPackages.map((pkg) => (
              <SwiperSlide key={pkg._id} className="transition-transform duration-300 hover:scale-105">
                <SinglePackage pkg={pkg} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Optional: Custom positioning for arrows */}
          <style>
            {`
              .swiper-button-prev, .swiper-button-next {
                color: #FF7A18;
                top: 50% !important;
                transform: translateY(-50%);
              }
              .swiper-button-prev { left: -10px; }
              .swiper-button-next { right: 10px; }
            `}
          </style>
        </div>
      </div>
    </section>
  );
}
