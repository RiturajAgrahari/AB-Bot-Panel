import { Link } from "react-router-dom";
import "../styles/Bot.css"

interface BotCardProps {
    BotName: string;
    BotPID: number;
    status: boolean;
    pfp: string;
    link: string;
}

function BotCard(props: BotCardProps) {
    return (
        <Link to={props.link} className="Bot-Card">
            <div className="bot-pfp" style={{backgroundColor: "rgb(0, 0, 0)"}}>
                <img src={props.pfp} alt={props.BotName} />
                <span className="bot-status" style={{backgroundColor: props.status ? "rgb(35, 165, 95)": "red"}}></span>
            </div>
            <div className="bot-info">
                <p className="bot-name">{props.BotName}</p>
                <p className="bot-pid">{props.BotPID}</p>
            </div>
        </Link>
    )
}

export default BotCard;