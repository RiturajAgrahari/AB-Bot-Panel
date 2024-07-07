import { Link } from "react-router-dom";
import "../styles/fandomBot.css"
import Card from "../components/Card";

const FandomBot = () => {
    return (
        <div className="Lucky-Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; Fandom Bot</p>
                </div>
                <h1>Fandom Bot</h1>
                <div className="card-container">
                    <Link style={{textDecoration: "none", color: "black"}} to={"https://arena-breakout.fandom.com/wiki/Arena_Breakout_Wiki"}><Card Title="Fandom Wiki" Amount={27} Logo={1}/></Link>
                </div>
            </div>
        </div>
    )
}

export default FandomBot;