import { Link } from "react-router-dom";
import "../../styles/home.css"
import Card from "../../components/card/Card";
import { useEffect, useRef, useState } from "react";
import api from "../../api";

const RPGBotDashboard = () => {

    const [totalInventories, setTotalInventories] = useState(0)

    const alertMessage = useRef<HTMLDivElement>(null)


    useEffect(() => {

        const FetchTotalInventories = async () => {
            try {
                const res = await api.get("/api-data/rpg-bot/total_inventory/")
                if (res.status == 200) {
                    setTotalInventories(res.data.total_inventories)
                }

            } catch (error) {
                handleShowAlertMessage();
                console.error("Error fetching!", error)
            }
        }

        FetchTotalInventories();
    }, [])

    const handleCloseAlertMessage = () => {
        if (alertMessage.current) {
            alertMessage.current.style.display = "none"    
        }
    }

    const handleShowAlertMessage = () => {
        if (alertMessage.current) {
            alertMessage.current.style.display = "block"
        }
    }

    return (
        <div className="Bot">
            <div ref={alertMessage} className="alert alert-danger alert-white rounded">
                <button onClick={handleCloseAlertMessage} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
                <strong>Error!</strong> Fetching the data!
            </div> 
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; &nbsp;RPG Bot</p>
                </div>
                <h1>RPG Bot</h1>
            </div>
            <div className="card-container">
                <Link style={{textDecoration: "none", color: "black"}} to={"inventory/"}><Card Title="Profiles" Amount={totalInventories} Logo={0}/></Link>
            </div>
        </div>
    )
}

export default RPGBotDashboard;