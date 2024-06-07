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
                    <Link style={{textDecoration: "none", color: "black"}} to={"#"}><Card Title="Profiles" Amount={0} Logo={0}/></Link>
                </div>
            </div>
        </div>
    )
}

export default FandomBot;