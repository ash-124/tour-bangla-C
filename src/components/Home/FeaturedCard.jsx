
const FeaturedCard = ({ icon, title, description }) => {
  return (
    <div className="py-10 px-3 shadow-lg flex flex-col text-center gap-5 bg-white border border-[#EA580C]  items-center justify-center 
      transition-all duration-300 hover:bg-[#EA580C] group">
      
      {/* icon */}
      <div className="text-3xl font-bold text-[#EA580C] group-hover:text-white">{icon}</div>

      {/* title */}
      <div className="text-xl text-black group-hover:text-white">{title}</div>

      {/* description */}
      <div className="text-lg text-gray-600 group-hover:text-white">{description}</div>
    </div>
  );
};

export default FeaturedCard;
