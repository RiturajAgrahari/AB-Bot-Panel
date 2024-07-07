import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Question from "../../components/question";
import "../../styles/questions.css"

interface QuestionsProps {
    id: number
    title: string
    description: string
    image: string
    type: string
    time: string
}

export default function PersonalizedBotQuestion() {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const FetchQuestions = async() => {
            try {
                const res = await api.get("/api-data/personalized-bot/questions/")
                if (res.status == 200) {
                    console.log(res.data)
                    setQuestions(res.data)
                }
            } catch (error) {
                console.error("Fetching Error", error)
            }
        }

        FetchQuestions();
    }, [])


    return (
        <div className="Questions-component">
        <div className="active-component-header">
            <div className="path">
                <Link to={"/"} className="path-link">Dashboard</Link>
                <p>&nbsp; &gt; &nbsp;</p>
                <Link to={"/personalized-bot"} className="path-link">Personalized Bot</Link>
                <p>&nbsp; &gt; Questions</p>
            </div>
            <h1>Questions</h1>
            <div className="add-question-div">
                <Link to={"add-question"} className="add-question-button">Add Question</Link>
            </div>
            <div className="card-container" style={{display: "block"}}>
                        {questions.map((item: QuestionsProps) => {
                            return (
                                <Question data={item} />
                            )
                        })}
            </div>
        </div>
    </div>
    )
}