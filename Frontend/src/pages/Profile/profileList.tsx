import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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

    const [totalProfiles, setTotalProfiles] = useState(0)
    const [profiles, setProfiles] = useState([])
    const [previousPage, setPreviousPage] = useState(false)
    const [NextPage, setNextPage] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [path, setPath] = useState("/api-data/profiles/")
    const [nextPageLink, setNextPageLink] = useState("")
    const [previousPageLink, setPreviousPageLink] = useState("")


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
                    setTotalProfiles(res.data.count)
                }

            } catch (error) {
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


    return (
        <div className="Lucky-Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; </p>
                    <Link to={"/profiles"} className="path-link">Profiles</Link>
                    <p>&nbsp; &gt; Profile</p>
                </div>
                <h1>PROFILE</h1>
                <div className="search-bar">
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
