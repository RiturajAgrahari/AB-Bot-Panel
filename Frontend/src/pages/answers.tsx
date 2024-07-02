import { ReactEventHandler, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

interface AnswersProps {
    id: number
    user_id: number
    question_id: number
    answers: string
    time: string
}

export default function PersonalizedBotAnswers() {
    const questionIdRef = useRef(null)

    const [answers, setAnswers] = useState([])

    const HandleSearch = async(e: React.FormEvent<HTMLInputElement>) => {
        try {
            const res = await api.get(`/api-data/personalized-bot/answers/?question_id=${e.currentTarget.value}`)
            if (res.status == 200) {
                setAnswers(res.data)
            }
        } catch (error) {
            console.error("Error Fetching", error)
        }
    }

    useEffect(() => {
        const FetchAnswers = async() => {
            try {
                const res = await api.get("/api-data/personalized-bot/answers/")
                if (res.status == 200) {
                    setAnswers(res.data)
                }
            } catch (error) {
                console.error("Error Fetching", error)
            }
        }
        FetchAnswers();
    }, [])

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
                <div className="search-bar">
                    <input ref={questionIdRef} type="text" className="search" placeholder="Question ID" autoComplete="false" onChange={(e) => {HandleSearch(e)}}></input>
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
                {/* <div className="loader" style={{display: loading ? "flex" : "none"}}>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                </div> */}
            <table>
                <tbody>
                    <tr>
                        <th>id</th>
                        <th>answers</th>
                        <th>time</th>
                        <th>question</th>
                        <th>profile</th>
                    </tr>
                    {answers.map((item: AnswersProps) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
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
    </div>
    )
}