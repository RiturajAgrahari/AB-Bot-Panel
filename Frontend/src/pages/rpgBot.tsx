import { Link } from "react-router-dom";
import "../styles/luckyBot.css"
import Card from "../components/Card";
import { useEffect, useState } from "react";
// import { API } from "../constants"
import api from "../api";

const RPGBotDashboard = () => {

    const [totalInventories, setTotalInventories] = useState(0)

    useEffect(() => {
        // const FetchTotalInventories = async () => {
        //     try {
        //         const res = await fetch(`${API}/api-data/rpg-bot/total_inventory/`)
        //         if (!res.ok) {
        //             throw new Error("Failed to fetch data!");
        //         }
        //         const resData = await res.json();
        //         setTotalInventories(resData.total_inventories)
        //     } catch (error) {
        //         console.error("Error fetching", error)
        //     }
        // }

        const FetchTotalInventories = async () => {
            try {
                const res = await api.get("/api-data/rpg-bot/total_inventory/")
                if (res.status == 200) {
                    setTotalInventories(res.data.total_inventories)
                }

            } catch (error) {
                console.error("Error fetching!", error)
            }
        }

        FetchTotalInventories();
    }, [])

    return (
        <div className="Lucky-Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; RPG Bot</p>
                </div>
                <h1>RPG Bot</h1>
                <div className="card-container">
                    <Link style={{textDecoration: "none", color: "black"}} to={"inventory/"}><Card Title="Profiles" Amount={totalInventories} Logo={0}/></Link>
                </div>
            </div>
        </div>
    )
}

export default RPGBotDashboard;