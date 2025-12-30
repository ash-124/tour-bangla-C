import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut().catch(console.log);
    };
    const navLinkClass = ({ isActive }) =>
        `rounded-full px-4 py-2 transition text-white ${isActive
            ? 'bg-[#FF7A18] '
            : 'text-gray-700 hover:bg-gray-400'
        }`;
    const navlinks =
        <>
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/packages" className={navLinkClass}>Packages</NavLink></li>
            <li><NavLink to="/about-us" className={navLinkClass}>About us</NavLink></li>
            <li><NavLink to="/trips" className={navLinkClass}>Trips</NavLink></li>
        </>


    return (
        <div className="navbar fixed top-0 z-50 bg-blue-950/60 backdrop-blur-md backdrop-saturate-150 border-b border-white/10 text-white">

            {/* Navbar Start */}
            <div className="navbar-start">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="https://i.pinimg.com/474x/bc/8e/76/bc8e764bece45d88dfb31c6fcabca83a.jpg"
                        alt="Tour Bangla"
                        className="w-9 h-9 rounded-md"
                    />
                    <span className="text-xl font-bold">
                        Tour Bangla
                    </span>
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal gap-2">
                    {navlinks}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end gap-2">

                {/* Mobile Menu */}
                <div className="dropdown md:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl bg-blue-950/60 backdrop-blur-md backdrop-saturate-150  shadow-lg "
                    >
                        {navlinks}
                    </ul>
                </div>

                {/* User Section */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring-2 ring-[#FF7A18] ring-offset-2">
                                <img src={user?.photoURL} alt="User" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl bg-blue-950/60 backdrop-blur-md backdrop-saturate-150  shadow-lg"
                        >
                            <li>
                                <NavLink to="/dashboard" className="hover:bg-gray-300">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/profile" className="hover:bg-gray-300">
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className="text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="btn rounded-full bg-[#FF7A18] text-white hover:bg-[#e86d12]"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
