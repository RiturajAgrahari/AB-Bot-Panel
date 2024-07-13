import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Question from "../../components/question";
import "../../styles/question.css"

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

    const alertMessage = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const FetchQuestions = async() => {
            console.log("sending request")
            try {
                const res = await api.get("/api-data/personalized-bot/questions/")
                if (res.status == 200) {
                    console.log(res.data)
                    setQuestions(res.data)
                }
            } catch (error) {
                handleShowAlertMessage();
                console.error("Fetching Error", error)
            }
        }

        FetchQuestions();
    }, [])

    const handleCloseAlertMessage = () => {
        if (alertMessage.current) {
            alertMessage.current.style.display = "none"    
        }
    }

    const handleShowAlertMessage = () => {
        if (alertMessage.current) {
            alertMessage.current.style.display = "block"
        }
    }

    return (
        <div className="Bot question-components">
        <div className="active-component-header">
            <div ref={alertMessage} className="alert alert-danger alert-white rounded">
                <button onClick={handleCloseAlertMessage} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
                <strong>Error!</strong> Fetching the data!
            </div> 
            <div className="path">
                <Link to={"/"} className="path-link">Dashboard</Link>
                <p>&nbsp; &gt; &nbsp;</p>
                <Link to={"/personalized-bot"} className="path-link">Personalized Bot</Link>
                <p>&nbsp; &gt; &nbsp;Questions</p>
            </div>
            <h1>Questions</h1>
        </div>
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
    )
}