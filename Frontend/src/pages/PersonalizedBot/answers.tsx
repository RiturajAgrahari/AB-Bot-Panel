import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "../../styles/answers.css"

interface QuestionProps {
    question_id: string
}

interface AnswersProps {
    id: number
    user_id: number
    question_id: number
    answers: string
    time: string
}

export default function PersonalizedBotAnswers({question_id} : QuestionProps) {
    const questionIdRef = useRef(null)
    const alertMessage = useRef<HTMLDivElement>(null)


    const [questionid, setQuestionid] = useState(question_id)
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState<boolean>()

    useEffect(() => {
        const FetchAnswers = async() => {
            setLoading(true)
            try {
                const res = await api.get(`/api-data/personalized-bot/answers/?question_id=${questionid}`)
                if (res.status == 200) {
                    setAnswers(res.data)
                    console.log(answers)
                }
            } catch (error) {
                handleShowAlertMessage();
                console.error("Error Fetching", error)
            } finally {
                setLoading(false)
            }
        }
        FetchAnswers();
    }, [questionid])

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
        <div className="Lucky-Bot Bot">
            <div ref={alertMessage} className="alert alert-danger alert-white rounded">
                <button onClick={handleCloseAlertMessage} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
                <strong>Error!</strong> Fetching the data!
            </div> 
        <div className="active-component-header">
            <div className="path">
                <Link to={"/"} className="path-link">Dashboard</Link>
                <p>&nbsp; &gt; &nbsp;</p>
                <Link to={"/personalized-Bot"} className="path-link">Personalized-Bot</Link>
                <p>&nbsp; &gt; Answers</p>
            </div>
            <h1>Answers</h1>
        </div>
                <div className="search-bar">
                    <input ref={questionIdRef} defaultValue={questionid} type="text" className="search" placeholder="Question ID" autoComplete="false" onChange={(e) => {setQuestionid(e.target.value)}}></input>
                    <div className="fl">
                        {/* <select name="pages" className="pages" defaultValue={10} onChange={HandleItemsPerPage}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="all">all</option>
                        </select> */}
                        {/* <div className="pagination">
                            <button style={{visibility: previousPage ? "visible" : "hidden"}} onClick={HandlePreviousPage}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></button>
                            <p>{pageNumber}</p>
                            <button style={{visibility: NextPage ? "visible" : "hidden"}} onClick={HandleNextPage}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg></button>
                        </div> */}
                    </div>
                </div>
            <div className="loader" style={{display: loading ? "flex" : "none"}}>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
            </div>
            <div className="table-div" style={{display : loading ? "none" : "flex"}}>
            <table>
                <tbody>
                    <tr>
                        <th>question id</th>
                        <th>answers</th>
                        <th>time</th>
                        <th>question</th>
                        <th>profile</th>
                    </tr>

                    {answers.map((item: AnswersProps) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.question_id}</td>
                                <td>{item.answers}</td>
                                <td>{item.time}</td>
                                <td className="check-profile"><Link to={`/questions/${item.question_id}`} className="profile-button">question</Link></td>
                                <td className="check-profile"><Link to={`/profile/${item.user_id}`} className="profile-button">check profile</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>

            {
                answers.length == 0 
                ? <div className="no-answer-error">There is no answer for this question id!</div>
                : <div></div>
            }
        </div>
    )
}