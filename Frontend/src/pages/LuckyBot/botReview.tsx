import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { AxiosError } from "axios";

interface BotReviewInterface {
    id: number;
    uid: number;
    review: string;
    review_on: string;
    star_rating: number;
}

function BotReview() {

    const [botReview, setBotReview] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorAccessMessage, setErrorAccessMessage] = useState("")

    const alertMessage = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchBotReview = async() => {
            setLoading(true)
            try {
                const res = await api.get("api-data/lucky-bot/bot-reviews/")
                if (res.status == 200) {
                    setBotReview(res.data)
                }
            } catch (error) {
                if (error instanceof AxiosError){
                    if (error.response?.status == 401) {
                        handleShowAlertMessage("Guests are not allowed to check the profile!");
                    } else {
                        handleShowAlertMessage("Fetching the data!");
                        console.error("Error Fetching", error)
                    }
                } else {
                    handleShowAlertMessage("Fetching the data!");
                    console.error("Error Fetching", error)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchBotReview();
    }, [])

    const handleCloseAlertMessage = () => {
        if (alertMessage.current) {
            alertMessage.current.style.display = "none"    
        }
    }

    const handleShowAlertMessage = (msg: string) => {
        setErrorAccessMessage(msg)
        if (alertMessage.current) {
            alertMessage.current.style.display = "block"
        }
    }

    return (
        <div className="Bot">
            <div ref={alertMessage} className="alert alert-danger alert-white rounded">
                <button onClick={handleCloseAlertMessage} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
                <strong>Error!</strong> {errorAccessMessage}
            </div>
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; &nbsp;</p>
                    <Link to={"/lucky-bot"} className="path-link">Lucky Bot</Link>
                    <p>&nbsp; &gt; &nbsp;Bot Review</p>
                </div>
                <h1>Bot Review</h1>
            </div>
            <div className="loader" style={{display: loading ? "flex" : "none"}}>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
            </div>
            <div className="table-div" style={{display: loading ? "none": "flex"}}>
                <table>
                    <tbody>
                        <tr>
                            <th>UID</th>
                            <th>Star Rating</th>
                            <th>Review</th>
                            <th>Reviewed on</th>
                            <th>Profile</th>
                        </tr>
                        {
                            botReview.map((item: BotReviewInterface) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.uid}</td>
                                        <td>{item.star_rating}</td>
                                        <td>{item.review}</td>
                                        <td>{item.review_on}</td>
                                        <td className="check-profile"><Link to={`/profile/${item.uid}`} className="profile-button">check profile</Link></td>
                                        </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default BotReview;