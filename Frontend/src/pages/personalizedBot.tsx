import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import api from "../api";

function PersonalizedBot() {

    const [totalQuestion, setTotalQuestion] = useState(0)
    const [totalAnswer, setTotalAnswer] = useState(0)

    useEffect(()=> {
        const FetchTotalTests = async() => {
            try {
                const res = await api.get("/api-data/personalized-bot/total-record/")
                if (res.status == 200) {
                    setTotalQuestion(res.data.total_questions)
                    setTotalAnswer(res.data.total_answers)
                }
            } catch (error) {
                console.error("Error Fetching!", error)
            }
        }

    FetchTotalTests();
    }, [])


    return (
        <div className="Lucky-Bot">
        <div className="active-component-header">
            <div className="path">
                <Link to={"/"} className="path-link">Dashboard</Link>
                <p>&nbsp; &gt; Personalized Bot</p>
            </div>
            <h1>Personalized Bot</h1>
            <div className="card-container">
                <Link style={{textDecoration: "none", color: "black"}} to={"questions/"}><Card Title="Questions" Amount={totalQuestion} Logo={3}/></Link>
                <Link style={{textDecoration: "none", color: "black"}} to={"answers/"}><Card Title="Answers" Amount={totalAnswer} Logo={4}/></Link>
            </div>
        </div>
    </div>
    )
}

export default PersonalizedBot;