import Sidebar from "../components/sidebar";
import "../styles/home.css";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

type ActiveSidebarLink = {
    activeSidebarLink: number;
    component: ReactNode;
};

const Home = ({activeSidebarLink, component}: ActiveSidebarLink) => {

    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="Home">
            <Sidebar ActiveDashboardLink={activeSidebarLink}></Sidebar>
            <div className="active-component">
                {component}
            </div>
        </div>
    )
}

export default Home;