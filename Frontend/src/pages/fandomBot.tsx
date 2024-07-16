import { Link } from "react-router-dom";
import "../styles/home.css"
import Card from "../components/Card";

const FandomBot = () => {
    return (
        <div className="Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; &nbsp;Fandom Bot</p>
                </div>
                <h1>Fandom Bot</h1>
            </div>
            <div className="card-container">
                <Link style={{textDecoration: "none", color: "black"}} to={"https://arena-breakout.fandom.com/wiki/Arena_Breakout_Wiki"}><Card Title="Fandom Wiki" Amount={"Fandom Wiki"} Logo={1}/></Link>
            </div>
        </div>
    )
}

export default FandomBot;