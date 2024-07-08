import { Link } from "react-router-dom"
import "../styles/question.css"

interface questionProps {
    data: {
    id: number
    title: string
    description: string
    image: string
    type: string
    time: string
}
}

export default function Question(question: questionProps) {
    return (
        <div className="question-component">
            <div className="question-image">
                <img src={question.data.image} alt="" />
            </div>
            <div className="question-data">
                <div className="question-details">
                    <p>{question.data.title}</p>
                    <p>{question.data.description}</p>
                </div>
                <div className="question-footer">
                    <p>{question.data.time}</p>
                    <Link to={`/personalized-bot/answers/${question.data.id}`} className="check-asnwer-button">Check Answers</Link>
                </div>
            </div>
        </div>
    )
}