import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/SignUp";
import Home from "../pages/Home/Home";
import PackageDetails from "../pages/Home/tourismGuideSection/PackageDetails";
import Dashboard from "../pages/DashBoard/Dashboard";
import Profile from "../pages/DashBoard/Profile";
import Packages from "../pages/Packages";
import ApplyAsGuide from "../pages/DashBoard/ApplyAsGuide";
import GuideProfile from "../pages/tourGuidesProfile/GuideProfile";
import MyBookings from "../pages/myBookingPage/MyBookings";
import ManageUsers from "../pages/DashBoard/Admin/ManageUsers";
import ManageCandidates from "../pages/DashBoard/Admin/ManageCandidates";
import AddPackage from "../pages/DashBoard/Admin/AddPackage";

export const router =createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'packages',
                element:<Packages/>
            },
            {
                path:'/package/:id',
                element:<PackageDetails/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'signup',
                element:<SignUp/>
            },
            {
                path:'/guide-profile/:email',
                element:<GuideProfile/>
            }
        ]
    },
    {
        path:'dashboard',
        element:<Dashboard/>,
        children:[
            {
                path:'profile',
                element:<Profile/>
            },
            {
                path:'join-tour-guide',
                element:<ApplyAsGuide/>

            },
            {
                path:'my-bookings',
                element:<MyBookings/>
            },
            // admin routes
            // TO:DO make a admin profile component 
            {
                path:'users',
                element:<ManageUsers/>

            },
            {
                path:'candidates',
                element:<ManageCandidates/>
            }, 
            {
                path:'add-package',
                element:<AddPackage/>
            }
            
        ]
    }
])