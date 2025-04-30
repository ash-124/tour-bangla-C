import CountUp from 'react-countup';

const FunFacts = () => {
    const stats = [
        { number: '1001', label: 'Happy Customers' },
        { number: '15', label: 'Packages' },
        { number: '59', label: 'Destinations' },
        { number: '999', label: 'Top Rated' },
    ];

    return (
        <section
            className="relative bg-cover my-10 bg-center bg-no-repeat text-white"
            style={{ backgroundImage: "url('https://i.ibb.co.com/gMh5VVQZ/ratargul.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#747C98] opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Some fun facts</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <CountUp
                                start={0}
                                end={stat.number}
                                duration={3}
                                useEasing={true}
                                redraw={true}
                                enableScrollSpy={true}
                                scrollSpyOnce={true}
                                className="text-3xl  font-semibold"
                            />
                            <p className="mt-2 text-lg ">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FunFacts;
