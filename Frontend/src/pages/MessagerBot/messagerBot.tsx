import { Link } from "react-router-dom";
import "./messagerBot.css"

const MessagerBot = () => {
    return (
        <div className="Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; &nbsp;Messager Bot</p>
                </div>
                <h1>Configure Messager Bot</h1>
                <h1>URL</h1>
                
                <form action="POST">
                    <input type="text" value={"https://bit.ly/3Vgtc7G "} disabled></input>
                </form>
            </div>
        </div>
    )
}

export default MessagerBot;