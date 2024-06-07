import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom"

const TodayLuck = () => {

    interface TodayluckProps {
        uid: number;
        location: string;
        container: string;
        weapon: string;
        item: string;
        summary: string;
    }

    const [todayLuck, setTodayLuck] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchFor, setSearchFor] = useState("")



    useEffect(() => {
        const FetchTodayLuck = async () => {
            setLoading(true)
            try {
                const res = await api.get("api-data/lucky-bot/today_luck/")
                if (res.status == 200) {
                    setTodayLuck(res.data)
                }
            } catch (error) {
                console.error("error fetching", error)
            } finally {
                setLoading(false)
            }
        }
        FetchTodayLuck();
    }, [])

    return (
        <div className="Inventory">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt;</p>
                    <Link to={"/lucky_bot"} className="path-link">Lucky Bot</Link>
                    <p>&nbsp; &gt; Today Luck</p>
                </div>
                <h1>Lucky Bot</h1>
                <div className="search-bar">
                    <input type="text" className="search" placeholder="Search" autoComplete="false" onChange={(event) => setSearchFor(event.target.value)}></input>
                </div>
                <div className="loader" style={{display: loading ? "flex" : "none"}}>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>UID</th>
                            <th>Location</th>
                            <th>Container</th>
                            <th>Weapon</th>
                            <th>Item</th>
                            <th>Summary</th>
                            <th >Profile</th>
                        </tr>
                        {todayLuck.map((item: TodayluckProps) => {
                            return (
                                <tr key={item.uid}>
                                    <td>{item.uid}</td>
                                    <td>{item.location}</td>
                                    <td>{item.container}</td>
                                    <td>{item.weapon}</td>
                                    <td>{item.item}</td>
                                    <td>{item.summary}</td>
                                    <td className="check-profile"><Link to={`/profile/${item.uid}`} className="profile-button">check profile</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TodayLuck;