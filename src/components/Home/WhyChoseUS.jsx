import React from 'react';
import ReviewCardSwiper from './ReviewCardSwiper';

const WhyChoseUS = () => {
    const reviews = [
        {
            "name": "Rahman Hossain",
            "rating": 5,
            "package": "Sundarbans Adventure",
            "review": "Amazing experience! The boat tour through the Sundarbans was breathtaking, and we even saw a Royal Bengal tiger from a distance. Highly recommended!",
            "date": "2025-04-10",
            "image": "https://example.com/images/sundarbans-tour.jpg"
        },
        {
            "name": "Farzana Akter",
            "rating": 4,
            "package": "Sylhet Tea Garden Escape",
            "review": "The green scenery and peaceful environment were perfect for a relaxing weekend. The guide was friendly and knowledgeable. I wish the food options were more diverse though.",
            "date": "2025-03-28",
            "image": "https://example.com/images/sylhet-tea-garden.jpg"
        },
        {
            "name": "Shahriar Alam",
            "rating": 5,
            "package": "Cox's Bazar Beach Retreat",
            "review": "Best beach holiday ever! Clean resort, great service, and unforgettable sunsets. Tour Bangla handled everything smoothly from booking to checkout.",
            "date": "2025-04-02",
            "image": "https://example.com/images/coxs-bazar-beach.jpg"
        },
        {
            "name": "Nusrat Jahan",
            "rating": 4,
            "package": "Bandarban Hill Tracks",
            "review": "Stunning views and a great mix of hiking and cultural experiences. A bit physically demanding, but totally worth it for the nature lovers.",
            "date": "2025-03-20",
            "image": "https://example.com/images/bandarban-hills.jpg"
        },
        {
            "name": "Tanvir Ahmed",
            "rating": 5,
            "package": "Historic Dhaka Day Tour",
            "review": "Incredible insight into Dhaka’s rich history and architecture. The guide was very engaging, and transportation was comfortable. A must-do for anyone new to the city!",
            "date": "2025-04-15",
            "image": "https://example.com/images/historic-dhaka.jpg"
        }
    ]

    return (
        <div className='flex gap-32 items-center justify-center w-11/12 mx-auto py-10'>
            <div className='flex flex-col flex-1 gap-5'>
                <h3>Why Choose Us?</h3>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life.</p>
            </div>
            <div className='flex flex-col flex-1 gap-5'>
                <h3 >Our Guest Says</h3>
                {/* review Card */}
                <ReviewCardSwiper reviews={reviews}/>
            </div>
        </div>
    );
};

export default WhyChoseUS;