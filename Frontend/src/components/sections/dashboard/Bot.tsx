import { Link } from "react-router-dom";
import "./Bot.css"

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
            <div className="bot-pfp">
                <img src={props.pfp} alt={props.BotName} />
                <span className="bot-status" style={{backgroundColor: props.status ? "rgb(35, 165, 95)": "gray"}}></span>
            </div>
            <div className="bot-info">
                <p className="bot-name">{props.BotName}</p>
                <p className="bot-pid">{props.BotPID}</p>
            </div>
        </Link>
    )
}

export default BotCard;