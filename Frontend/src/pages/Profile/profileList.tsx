import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../../api";
import "../../styles/profileList.css"

interface InventoriesProp {
    uid: number;
    name: string;
    discord_id: string;
    event_used: number;
    last_used_on: string;
}

const Profile = () => {

    const [profiles, setProfiles] = useState([])
    const [previousPage, setPreviousPage] = useState(false)
    const [NextPage, setNextPage] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [path, setPath] = useState("/api-data/profiles/")
    const [nextPageLink, setNextPageLink] = useState("")
    const [previousPageLink, setPreviousPageLink] = useState("")

    const alertMessage = useRef<HTMLDivElement>(null)



    useEffect(() => {
        const fetchProfiles = async() => {
            try {
                const res = await api.get(path)
                if (res.status == 200) {
                    if (res.data.previous) {
                        setPreviousPage(true)
                        setPreviousPageLink(res.data.previous)
                    } else {
                        setPreviousPage(false)
                    }
                    if (res.data.next) {
                        setNextPage(true)
                        setNextPageLink(res.data.next)
                    } else {
                        setNextPage(false)
                    }
                    setProfiles(res.data.results)
                }

            } catch (error) {
                handleShowAlertMessage();
                console.log("Error fetching", error)
            }      
        }
        fetchProfiles();
    }, [path, pageNumber])

    const HandleItemsPerPage = (e:React.FormEvent<HTMLSelectElement>) => {
        setPath(`/api-data/profiles/?pageitems=${e.currentTarget.value}&`)
        // set current page back to 1
        setPageNumber(1)
    }

    const HandleNextPage = () => {
        setPath(nextPageLink)
        setPageNumber(pageNumber + 1)
    }

    const HandlePreviousPage = () => {
        setPath(previousPageLink)
        setPageNumber(pageNumber - 1)
    }

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
                    <Link to={"/profiles"} className="path-link">Profiles</Link>
                    <p>&nbsp; &gt; &nbsp;Profile</p>
                </div>
                <h1>PROFILE</h1>
            </div>
                <div className="search-bar">
                <input type="text" className="search" placeholder="Search" autoComplete="false" disabled></input>
                    {/* <input type="text" className="search" placeholder="Search" autoComplete="false" onChange={(e) => {HandleSearch(e)}}></input> */}
                    <div className="fl">
                        <select name="pages" className="pages" defaultValue={10} onChange={HandleItemsPerPage}>
                        {/* <select name="pages" className="pages" defaultValue={10} onChange={(e) => setItems(e.target.value)}> */}
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="all">all</option>
                        </select>
                        <div className="pagination">
                            <button style={{visibility: previousPage ? "visible" : "hidden"}} onClick={HandlePreviousPage}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></button>
                            <p>{pageNumber}</p>
                            <button style={{visibility: NextPage ? "visible" : "hidden"}} onClick={HandleNextPage}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg></button>
                        </div>
                    </div>
                </div>
                <div className="table-div">
                    <table>
                        <tbody>
                            <tr>
                                <th>uid</th>
                                <th>Discord ID</th>
                                <th>Discord Name</th>
                                <th>Event Used</th>
                                <th>Profile</th>
                            </tr>
                            {profiles.map((item: InventoriesProp) => {
                                    return (
                                        <tr key={item.uid}>
                                            <td>{item.uid}</td>
                                            <td>{item.discord_id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.event_used}</td>
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

export default Profile;
