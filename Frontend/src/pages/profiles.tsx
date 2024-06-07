import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import api from "../api";

const Profiles = () => {

    const [totalProfiles, setTotalProfiles] = useState(0)

    useEffect(() => {
        const fetchProfiles = async() => {
            try {
                const res = await api.get("/api-data/total_profiles/")
                if (res.status == 200) {
                    setTotalProfiles(res.data.total_profiles)
                }

            } catch (error) {
                console.log("Error fetching", error)
            }      
        }
        fetchProfiles();
    }, [])

    return (
        <div className="Lucky-Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; Profiles</p>
                </div>
                <h1>PROFILES</h1>
                <div className="card-container">
                    <Link style={{textDecoration: "none", color: "black"}} to={"profile/"}><Card Title="Profiles" Amount={totalProfiles} Logo={0}/></Link>
                </div>
            </div>
        </div>
    )
};

export default Profiles;