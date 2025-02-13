import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
// import useCart from "../hooks/useCart";
import useRole from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";


const Dashboard = () => {
    // const [cart] = useCart();
    const { user } = useAuth();
    const { isTourist, isAdmin, isTourGuide } = useRole();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {/* isAdmin condition */}
                    {isAdmin &&
                        <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaUtensils />
                                    Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems">
                                    <FaList />
                                    Manage Items </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaBook />
                                    Manage Bookings</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers />
                                    All users</NavLink>
                            </li>
                        </>}
                    {
                        isTourGuide && <div>tourguide</div>
                           
                    }
                    { 
                        isTourist &&  <>
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