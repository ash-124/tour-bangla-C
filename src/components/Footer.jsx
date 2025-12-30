import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="relative bg-blue-950/60 backdrop-blur-md backdrop-saturate-150 border-t border-white/10 text-[#F8FAFC]">

            {/* Top Footer */}
            <div className="container mx-auto px-4 md:px-0 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Company Info */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://i.pinimg.com/474x/bc/8e/76/bc8e764bece45d88dfb31c6fcabca83a.jpg"
                            alt="Tour Bangla"
                            className="w-10 h-10 rounded-md"
                        />
                        <span className="text-xl font-bold text-white">Tour Bangla</span>
                    </div>
                    <p className=" leading-relaxed">
                        Providing reliable tour plans and packages. Explore the best destinations with us and make your journey unforgettable.
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-col items-start md:items-end gap-3">
                    <span className="text-white font-semibold text-lg">Follow Us</span>
                    <div className="flex gap-4">
                        <Link to="https://github.com/ash-124" target="_blank" className="hover:text-[#FF7A18] transition-colors">
                            <FaGithub size={24} />
                        </Link>
                        <Link to="https://linkedin.com/in/asraful-ratul" target="_blank" className="hover:text-[#FF7A18] transition-colors">
                            <FaLinkedin size={24} />
                        </Link>
                        <Link to="https://www.facebook.com/ai.ratul.776114" target="_blank" className="hover:text-[#FF7A18] transition-colors">
                            <FaFacebook size={24} />
                        </Link>
                    </div>
                </div>

            </div>

            {/* Bottom Footer */}
            <div className="p-4 footer-center bg-base-300 text-base-content">
                <div>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Tour Bangla</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
