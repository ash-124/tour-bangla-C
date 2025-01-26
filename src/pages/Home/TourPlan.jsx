import React from "react";

const Timeline = () => {
  const events = [
    {
      day: "Day 1: Arrive South Africa Forest",
      time: "8:00 am to 10:00 am",
      description:
        "Aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      inclusions: ["Air fares", "4 Nights Hotel Accommodation", "Entrance Fees"],
    },
    {
      day: "Day 2: Arrive South Africa Forest",
      time: "8:00 am to 10:00 am",
      description:
        "Aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      inclusions: ["Air fares", "4 Nights Hotel Accommodation", "Entrance Fees"],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      {events.map((event, index) => (
        <div key={index} className="flex items-start relative">
          {/* Circle Indicator */}
          <div className="flex flex-col items-center relative">
            <div className="w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center text-lg font-bold text-white z-10">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Content */}
          <div className="ml-5 flex-grow bg-white shadow-md p-5 rounded-lg mb-10">
            <p className="text-sm text-gray-500">{event.time}</p>
            <h3 className="text-xl font-bold text-orange-500 mt-2">
              {event.day}
            </h3>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <ul className="mt-3 space-y-2 text-gray-700">
              {event.inclusions.map((item, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
