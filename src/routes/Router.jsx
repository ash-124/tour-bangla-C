import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/SignUp";
import Home from "../pages/Home/Home";
import PackageDetails from "../pages/Home/tourismGuideSection/PackageDetails";
import Dashboard from "../pages/DashBoard/Dashboard";

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
            }
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard/>
    }
])