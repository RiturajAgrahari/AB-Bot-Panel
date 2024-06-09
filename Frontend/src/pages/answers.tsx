import { Link } from "react-router-dom";

export default function PersonalizedBotAnswers() {
    return (
        <div className="Lucky-Bot">
        <div className="active-component-header">
            <div className="path">
                <Link to={"/"} className="path-link">Dashboard</Link>
                <p>&nbsp; &gt; &nbsp;</p>
                <Link to={"/personalized-Bot"} className="path-link">Personalized-Bot</Link>
                <p>&nbsp; &gt; Answers</p>
            </div>
            <h1>Answers</h1>
            <div className="card-container">
            </div>
        </div>
    </div>
    )
}