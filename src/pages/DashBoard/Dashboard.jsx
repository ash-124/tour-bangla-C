import { FaAd, FaBars, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaTimes, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import { useEffect, useState } from "react";


const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isTourist, isAdmin, isTourGuide } = useRole();

    useEffect(() => {
        if (pathname === '/dashboard') {
            if (isTourist) navigate('/dashboard/my-bookings');
            if (isAdmin) navigate('/dashboard/profile');
            if (isTourGuide) navigate('/dashboard/assigned-tours')
        }
    }, [pathname, isTourist, isAdmin, isTourGuide])
    return (
        <div className="flex  relative">

            {/* Mobile Menu Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-blue-950 text-white p-2 rounded"
                onClick={() => setIsSidebarOpen(true)}
            >
                <FaBars size={20} />
            </button>

            {/* Overlay (mobile only) */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed md:static top-0 left-0 z-50
    w-64 min-h-screen
    bg-blue-950/30 md:bg-blue-950/20
    backdrop-blur-lg md:backdrop-blur-0
    border-r border-white/10
    transform transition-transform duration-300 ease-in-out
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
    `}
            >
                {/* Close button (mobile only) */}
                <button
                    className="md:hidden absolute top-4 right-4 text-white"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <FaTimes size={20} />
                </button>

                <ul className="menu p-4 dashboard mt-10 md:mt-0">
                    {/* Admin */}
                    {isAdmin && (
                        <>
                            <li><NavLink to="/dashboard/profile"><FaHome /> Admin Profile</NavLink></li>
                            <li><NavLink to="/dashboard/add-package"><FaUtensils /> Add Package</NavLink></li>
                            <li><NavLink to="/dashboard/users"><FaList /> Manage Users</NavLink></li>
                            <li><NavLink to="/dashboard/Candidates"><FaBook /> Manage Candidates</NavLink></li>
                        </>
                    )}

                    {/* Tour Guide */}
                    {isTourGuide && (
                        <>
                            <li><NavLink to="/dashboard/profile"><FaHome /> Profile</NavLink></li>
                            <li><NavLink to="/dashboard/assigned-tours"><FaUtensils /> My Assigned Tours</NavLink></li>
                            <li><NavLink to="/dashboard/manage-stories"><FaList /> Manage Stories</NavLink></li>
                            <li><NavLink to="/dashboard/add-story"><FaBook /> Add Story</NavLink></li>
                        </>
                    )}

                    {/* Tourist */}
                    {isTourist && (
                        <>
                            <li><NavLink to="/dashboard/profile"><FaHome /> Manage profile</NavLink></li>
                            <li><NavLink to="/dashboard/my-bookings"><FaCalendar /> My Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/manage-stories"><FaShoppingCart /> Manage Stories</NavLink></li>
                            <li><NavLink to="/dashboard/add-story"><FaAd /> Add Stories</NavLink></li>
                            <li><NavLink to="/dashboard/join-tour-guide"><FaList /> Join as tour guide</NavLink></li>
                        </>
                    )}

                    <div className="divider"></div>

                    <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li><NavLink to="/packages"><FaSearch /> Packages</NavLink></li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-2 md:p-4 ">
                <Outlet />
            </div>

        </div>

    );
};

export default Dashboard;