import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';



const Navbar = () => {
    const { user, logOut } = useAuth()

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    const links =
        <>
            <li>
                <NavLink to={'/'}>Home</NavLink>
            </li>

            <li>
                <NavLink to={'/packages'}>Packages</NavLink>
            </li>
            <li>
                <NavLink to={'/about-us'}>About us</NavLink>
            </li>
            <li>
                <NavLink to={'/trips'}>trips</NavLink>
            </li>
        </>
    return (
        <div className="navbar fixed z-50  bg-blue-950/50 text-white justify-evenly items-center">
            <div className="navbar-start">

                <Link to={'/'} className="btn btn-ghost text-xl">Tour Bangla</Link>
                <span><img className='w-10' src="https://i.pinimg.com/474x/bc/8e/76/bc8e764bece45d88dfb31c6fcabca83a.jpg" alt="" /></span>
            </div>
            <div className="navbar-center ">
                <div className="hidden md:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        {links}
                    </ul>
                </div>
                <div className="dropdown md:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 md:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-slate-600">
                        {links}
                    </ul>
                </div>
                {
                    user ? <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-slate-600 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <NavLink to={'/dashboard'} > Dashboard</NavLink>
                                </li>
                                <li>
                                    <Link
                                        to='/dashboard/profile'
                                        className="justify-between">
                                        Profile

                                    </Link>
                                </li>
                                {/* <li><a>Settings</a></li> */}
                                <li> <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button></li>
                            </ul>
                        </div>
                    </> : <>
                        <Link className='btn' to="/login">Login</Link>
                    </>
                }

            </div>

        </div>
    );
};

export default Navbar;