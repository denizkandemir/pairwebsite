// import Footer from "./Components/Footer/Footer"
import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import ScrollToTop from "./hooks/scrollToTop";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

export function Layout() {

    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const isLogin = location.pathname === "/login";

    return (
        <>
         <ScrollToTop/>
             {
                !isHomePage && !isLogin && <Navbar/>
            }
            <main>
                <Outlet />
            </main>
            {
              <Footer />
            }
        </>
    )
}