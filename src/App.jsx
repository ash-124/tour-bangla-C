import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

  return (
    <div className=" min-h-screen flex flex-col">
      {noHeaderFooter || <Navbar></Navbar>}
      <div className="flex-1"><Outlet></Outlet></div>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  )
}

export default App
