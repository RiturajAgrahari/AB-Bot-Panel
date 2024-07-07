import { Link } from "react-router-dom";
import "../../styles/luckyBot.css"
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import api from "../../api";

const LuckyBot = () => {

    const [totalTodayLuck, setTotalTodayLuck] = useState(0)

    useEffect(() => {
        const TotalTodayLucks = async () => {
            try {
                const res = await api.get("api-data/lucky-bot/total_today_luck/")
                if (res.status == 200 ) {
                    setTotalTodayLuck(res.data.total_today_luck)
                }
            } catch (error) {
                console.log("fetching failed", error)
            }
        }
        TotalTodayLucks();
    }, [])


    return (
        <div className="Lucky-Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; Lucky Bot</p>
                </div>
                <h1>Lucky Bot</h1>
                <div className="card-container">
                    <Link style={{textDecoration: "none", color: "black"}} to={"profiles/"}><Card Title="Profiles" Amount={totalTodayLuck} Logo={0}/></Link>
                    <Link style={{textDecoration: "none", color: "black"}} to={"statistics/"}><Card Title="Statistics" Amount={80} Logo={5}/></Link>
                </div>
            </div>
        </div>
    )
}

export default LuckyBot;