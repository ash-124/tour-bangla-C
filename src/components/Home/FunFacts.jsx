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
      className="relative mt-6  bg-center bg-cover bg-no-repeat text-white"
      style={{ backgroundImage: "url('https://i.ibb.co/gMh5VVQZ/ratargul.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#747C98]/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-4 md:px-0">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white drop-shadow-md">
          Some Fun Facts
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <CountUp
                start={0}
                end={parseInt(stat.number.replace(/,/g, ''))}
                duration={3}
                useEasing={true}
                redraw={true}
                enableScrollSpy={true}
                scrollSpyOnce={true}
              >
                {({ countUpRef }) => (
                  <span
                    ref={countUpRef}
                    className="text-4xl md:text-5xl font-bold text-[#FF7A18] drop-shadow-md"
                  />
                )}
              </CountUp>
              <p className="mt-2 text-lg md:text-xl text-[#F8FAFC]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunFacts;
