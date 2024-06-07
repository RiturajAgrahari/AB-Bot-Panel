import "../styles/Bot.css"

interface BotCardProps {
    BotName: string;
    BotPID: number;
    status: boolean;
    pfp: string;
}

function BotCard(props: BotCardProps) {
    return (
        <div className="Bot-Card">
            <div className="bot-pfp">
                <img src={props.pfp} alt="Lucky Bot" />
            </div>
            <div className="bot-info">
                <p className="bot-name">{props.BotName}</p>
                <p className="bot-pid">{props.BotPID}</p>
            </div>
        </div>
    )
}

export default BotCard;