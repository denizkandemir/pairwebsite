// import Footer from "./Components/Footer/Footer"
import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./hooks/ScrollToTop";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import useSeoMeta from "./hooks/useSeoMeta";
import { buildOrganizationSchema, buildWebsiteSchema, pageSeo } from "./seo/siteSeo";

export function Layout() {

    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const isLogin = location.pathname === "/login";

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useSeoMeta({
        title: pageSeo.home.title,
        description: pageSeo.home.description,
        path: location.pathname,
        image: pageSeo.home.image,
        keywords: pageSeo.home.keywords,
        schemas: [
            { key: 'organization', data: buildOrganizationSchema() },
            { key: 'website', data: buildWebsiteSchema() },
        ],
    });

    useEffect(() => {
        const root = document.querySelector("#root");

        if (isSidebarOpen) {
            if (root) {
                root.classList.add("no-scroll");
            }
            document.body.classList.add("no-scroll");
        } else {
            if (root) {
                root.classList.remove("no-scroll");
            }
            document.body.classList.remove("no-scroll");
        }
    }, [isSidebarOpen]);

    return (
        <>
         <ScrollToTop/>
            {
                !isHomePage && !isLogin && (
                    <>
                        <div className={isSidebarOpen ? "open-sidebar" : "close-sidebar"}>
                            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
                        </div>
                        <Navbar setSidebarOpen={setSidebarOpen} />
                    </>
                )
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