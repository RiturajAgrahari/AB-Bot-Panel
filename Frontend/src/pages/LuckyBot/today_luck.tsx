import React, { useEffect, useRef, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom"

const TodayLuck = () => {

    interface TodayluckProps {
        uid: number;
        location: string;
        container: string;
        weapon: string;
        item: string;
        summary: string;
    }

    const [todayLuck, setTodayLuck] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchFor, setSearchFor] = useState("")
    const [category, setCategory] = useState("")
    const [inputState, setInputState] = useState(true)

    const searchBarRef = useRef<HTMLInputElement>(null)
    const alertMessage = useRef<HTMLDivElement>(null)

    const handleCategorySelect = (e:React.FormEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value) {
            setCategory(e.currentTarget.value)
            setInputState(false)
        } else {
            setInputState(true)
        }
        setSearchFor("");
        searchBarRef.current?.focus();  
    }

    useEffect(() => {
        const FetchTodayLuck = async () => {
            setLoading(true)
            try {
                const res = await api.get(`api-data/lucky-bot/today_luck/?category=${category}&search=${searchFor}`)
                if (res.status == 200) {
                    setTodayLuck(res.data)
                }
            } catch (error) {
                handleShowAlertMessage();
                console.error("error fetching", error)
            } finally {
                setLoading(false)
            }
        }
        FetchTodayLuck();
    }, [searchFor])

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
        <div className="Bot">
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
                    <Link to={"/lucky-bot"} className="path-link">Lucky Bot</Link>
                    <p>&nbsp; &gt; &nbsp;Today Luck</p>
                </div>
            <h1>Lucky Bot</h1>
            </div>
            <div className="search-bar">
                <input ref={searchBarRef} type="text" className="search" value={searchFor} placeholder="Search" autoComplete="false" onChange={(event) => setSearchFor(event.target.value)} disabled={inputState}></input>
                <select name="category" className="search-for" defaultValue={category} onChange={(e) => {handleCategorySelect(e)}} required>
                    <option value="">None</option>
                    <option value="uid">UID</option>
                    <option value="location">Location</option>
                    <option value="container">Container</option>
                    <option value="weapon">Weapon</option>
                    <option value="item">Item</option>
                    <option value="summary">Summary</option>
                </select>
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
                        <th>Location</th>
                        <th>Container</th>
                        <th>Weapon</th>
                        <th>Item</th>
                        <th>Summary</th>
                        <th >Profile</th>
                    </tr>
                    {todayLuck.map((item: TodayluckProps) => {
                        return (
                            <tr key={item.uid}>
                                <td>{item.uid}</td>
                                <td>{item.location}</td>
                                <td>{item.container}</td>
                                <td>{item.weapon}</td>
                                <td>{item.item}</td>
                                <td>{item.summary}</td>
                                <td className="check-profile"><Link to={`/profile/${item.uid}`} className="profile-button">check profile</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default TodayLuck;