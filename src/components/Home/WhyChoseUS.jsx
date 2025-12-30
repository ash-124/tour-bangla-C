import React from 'react';
import ReviewCardSwiper from './ReviewCardSwiper';

const WhyChoseUS = () => {
    const reviews = [
        {
            name: "Rahman Hossain",
            rating: 5,
            package: "Sundarbans Adventure",
            review: "Amazing experience! The boat tour through the Sundarbans was breathtaking, and we even saw a Royal Bengal tiger from a distance. Highly recommended!",
            date: "2025-04-10",
            image: "https://i.pinimg.com/736x/7c/aa/97/7caa970c062a226b9efe7d53c19e45a0.jpg"
        },
        {
            name: "Farzana Akter",
            rating: 4,
            package: "Sylhet Tea Garden Escape",
            review: "The green scenery and peaceful environment were perfect for a relaxing weekend. The guide was friendly and knowledgeable. I wish the food options were more diverse though.",
            date: "2025-03-28",
            image: "https://i.pinimg.com/736x/f9/09/cb/f909cb561c94235ad18b96d7c94409f6.jpg"
        },
        {
            name: "Shahriar Alam",
            rating: 5,
            package: "Cox's Bazar Beach Retreat",
            review: "Best beach holiday ever! Clean resort, great service, and unforgettable sunsets. Tour Bangla handled everything smoothly from booking to checkout.",
            date: "2025-04-02",
            image: "https://i.pinimg.com/736x/f0/4b/c7/f04bc7f4b16a2fc94078139ad03e6f88.jpg"
        },
        {
            name: "Nusrat Jahan",
            rating: 4,
            package: "Bandarban Hill Tracks",
            review: "Stunning views and a great mix of hiking and cultural experiences. A bit physically demanding, but totally worth it for the nature lovers.",
            date: "2025-03-20",
            image: "https://i.pinimg.com/736x/23/92/eb/2392ebf767572274eec03ee3a88c28dd.jpg"
        },
        {
            name: "Tanvir Ahmed",
            rating: 5,
            package: "Historic Dhaka Day Tour",
            review: "Incredible insight into Dhaka’s rich history and architecture. The guide was very engaging, and transportation was comfortable. A must-do for anyone new to the city!",
            date: "2025-04-15",
            image: "https://i.pinimg.com/736x/bd/47/24/bd47246e54ea7fa322ed8cef799afd5f.jpg"
        }
    ];

    return (
        <section className='bg-[#F8FAFC] text-[#0F172A] py-16'>
            <div className='container mx-auto px-4 md:px-0 flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24'>

                {/* Left Content */}
                <div className='flex-1'>
                    <h3 className='text-3xl md:text-4xl font-bold mb-6'>Why Choose Us?</h3>
                    <p className='text-[#64748B] leading-relaxed mb-4'>
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                    </p>
                    <p className='text-[#64748B] leading-relaxed'>
                        Even the all-powerful Pointing has no control about the blind texts; it is an almost unorthographic life.
                    </p>
                </div>

                {/* Right Content */}
                <div className='flex-1'>
                    <h3 className='text-3xl md:text-4xl font-bold mb-6'>Our Guests Say</h3>
                    <ReviewCardSwiper reviews={reviews} />
                </div>
            </div>
        </section>
    );
};

export default WhyChoseUS;
