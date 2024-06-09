import { useEffect, useState } from "react";
import "../styles/Bot.css"

interface BotCardProps {
    BotName: string;
    BotPID: number;
    status: boolean;
    pfp: string;
}

function BotCard(props: BotCardProps) {
    const [css, setCss] = useState("")

    return (
        
        <div className="Bot-Card">
            <div className="bot-pfp" style={{backgroundColor: "rgb(0, 0, 0)"}}>
                <img src={props.pfp} alt={props.BotName} />
                <span className="bot-status" style={{backgroundColor: props.status ? "rgb(35, 165, 95)": "red"}}></span>
            </div>
            <div className="bot-info">
                <p className="bot-name">{props.BotName}</p>
                <p className="bot-pid">{props.BotPID}</p>
            </div>
        </div>
    )
}

export default BotCard;