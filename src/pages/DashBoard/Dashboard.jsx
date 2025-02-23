import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import { useEffect } from "react";


const Dashboard = () => {
    // const [cart] = useCart();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const { isTourist, isAdmin, isTourGuide } = useRole();
    
        useEffect(() => {
            if(pathname ==='/dashboard'){
            if (isTourist) navigate('/dashboard/my-bookings');
            if (isAdmin) navigate('/dashboard/users');
            if(isTourGuide) navigate('/dashboard/profile')
        }}, [ pathname, isTourist, isAdmin, isTourGuide])
        return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {/* isAdmin condition */}
                    {isAdmin &&
                        <>
                            <li>
                                <NavLink to="/dashboard/profile">
                                    <FaHome></FaHome>
                                    Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-package">
                                    <FaUtensils />
                                    Add Package</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaList />
                                    Manage Users </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/Candidates">
                                    <FaBook />
                                    Manage Candidates</NavLink>
                            </li>
                        </>
                    }
                    {
                        isTourGuide &&
                        <>
                            <li>
                                <NavLink to="/dashboard/profile">
                                    <FaHome></FaHome>
                                    Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/assigned-tours">
                                    <FaUtensils />
                                    My Assigned Tours</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaList />
                                    Stories </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/Candidates">
                                    <FaBook />
                                    Add Story</NavLink>
                            </li>
                        </>

                    }
                    {
                        isTourist && <>
                            <li>
                                <NavLink to='/dashboard/profile'>
                                    <FaHome></FaHome>
                                    Manage profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-bookings">
                                    <FaCalendar></FaCalendar>
                                    My Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-stories">
                                    <FaShoppingCart></FaShoppingCart>
                                    Manage Stories</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-stories">
                                    <FaAd></FaAd>
                                    Add Stories</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/join-tour-guide">
                                    <FaList></FaList>
                                    Join as tour guide</NavLink>
                            </li>
                        </>
                    }

                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/packages">
                            <FaSearch></FaSearch>
                            Packages</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;