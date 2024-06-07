import { Link } from "react-router-dom";
import "./fandomBot.css"
import Sidebar from "../sidebar/sidebar";

const FandomBot = () => {
    return (
        <div className="Fandom-Bot">
            <Sidebar ActiveDashboardLink={2}></Sidebar>
            <div className="dashboard-content">
                <div className="path">
                    <Link to={"/dashboard"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; Fandom Bot</p>
                </div>
                <h1>Fandom Bot</h1>
                <div className="basic_datasets">
                        <div className="basic_data">
                            <svg xmlns="http://www.w3.org/2000/svg" className="cyanish" height="24" viewBox="0 -960 960 960" width="24"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
                            <p className="numbers">39,954</p>
                            <p className="text">Pre-registers</p>
                        </div>
                        <div className="basic_data">
                            <svg xmlns="http://www.w3.org/2000/svg" className='orangish' height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z"/></svg>
                            <p className="numbers">81</p>
                            <p className="text">Countries</p>
                        </div>
                        <div className="basic_data">
                            <svg xmlns="http://www.w3.org/2000/svg" className='greenish' height="24" viewBox="0 -960 960 960" width="24"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                            <p className="numbers">41,125</p>
                            <p className="text">Downloads</p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default FandomBot;