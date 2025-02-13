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
        path:'/dashboard',
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
            }
        ]
    }
])