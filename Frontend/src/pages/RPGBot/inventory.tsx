import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
// import { API } from "../constants"
import "../../styles/home.css"
import api from "../../api";

interface InventoriesProp {
    achievement: string
    id: number;
    koens: number
    status: string
    uid: number;
    storage: string;
}

const Inventory = () => {

    // On True it will filter the empty lists from the response...
    const [filterEmptyInventories, setFilterEmptyInventories] = useState(false)


    const [inventories, setInventories] = useState([])
    const [loading, setLoading] = useState(false)
    const [previousPage, setPreviousPage] = useState(false)
    const [NextPage, setNextPage] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [path, setPath] = useState("/api-data/rpg-bot/inventories/")
    const [nextPageLink, setNextPageLink] = useState("")
    const [previousPageLink, setPreviousPageLink] = useState("")
    const [itemsPerPage, setItemPerPage] = useState<string>("10")

    const alertMessage = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const FetchInventory = async () => {
            setLoading(true)
            try {
                    const res = await api.get(path);
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
                        console.log(res.data)
                        setInventories(res.data.results)
                   } 
            } catch (error) {
                handleShowAlertMessage();
                console.error("Error Fetching", error)
            } finally {
                setLoading(false)
            }
        }

        FetchInventory();
    }, [pageNumber, path, itemsPerPage, filterEmptyInventories])


    // Set how much items per page must be rendered!
    const HandleItemsPerPage = (e:React.FormEvent<HTMLSelectElement>) => {
        setItemPerPage(e.currentTarget.value)
        setPath(`/api-data/rpg-bot/inventories/?page_size=${e.currentTarget.value}&filterword=${filterEmptyInventories}`)
        // set current page back to 1
        setPageNumber(1)
    }

    const HandleFilter = () => {
        setPageNumber(1)
        setFilterEmptyInventories(!filterEmptyInventories)
        setPath(`/api-data/rpg-bot/inventories/?page_size=${itemsPerPage}&filterword=${!filterEmptyInventories}`)
    }

    const HandleNextPage = () => {
        setPath(nextPageLink)
        setPageNumber(pageNumber + 1)
    }

    const HandlePreviousPage = () => {
        setPath(previousPageLink)
        setPageNumber(pageNumber - 1)
    }

    const ArrangeEventLetters = (inventory_words: string) => {
        const words_array = inventory_words ? inventory_words.split(",") : [];

        const getLetterStyleAndRemove = (letter: string) => {
            const letterIndex = words_array.indexOf(letter);
            if (letterIndex !== -1) {
                words_array.splice(letterIndex, 1); // Remove the letter from the array
                return { color: "rgb(67, 161, 67)", fontWeight: 600 };
            } else {
                return { color: "rgb(169, 169, 169)", fontWeight: 600 };
            }
        };

        return (
            <div style={{display: "flex"}}>
                <p style={getLetterStyleAndRemove("A")}>A&nbsp;</p>
                <p style={getLetterStyleAndRemove("R")}>R&nbsp;</p>
                <p style={getLetterStyleAndRemove("E")}>E&nbsp;</p>
                <p style={getLetterStyleAndRemove("N")}>N&nbsp;</p>
                <p style={getLetterStyleAndRemove("A")}>A&nbsp;&nbsp;&nbsp;</p>
                <p style={getLetterStyleAndRemove("B")}>B&nbsp;</p>
                <p style={getLetterStyleAndRemove("R")}>R&nbsp;</p>
                <p style={getLetterStyleAndRemove("E")}>E&nbsp;</p>
                <p style={getLetterStyleAndRemove("A")}>A&nbsp;</p>
                <p style={getLetterStyleAndRemove("K")}>K&nbsp;</p>
                <p style={getLetterStyleAndRemove("O")}>O&nbsp;</p>
                <p style={getLetterStyleAndRemove("U")}>U&nbsp;</p>
                <p style={getLetterStyleAndRemove("T")}>T&nbsp;</p>
            </div>
        )
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
                    <Link to={"/rpg_bot"} className="path-link">RPG Bot</Link>
                    <p>&nbsp; &gt; &nbsp;Inventory</p>
                </div>
                <h1>RPG Bot</h1>
            </div>
                <div className="search-bar">
                    <input type="checkbox" onChange={HandleFilter}></input>
                    <p>Filter user with no words</p>
                    <div className="fl">
                        <select name="pages" className="pages" defaultValue={10} onChange={HandleItemsPerPage}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="10000">all</option>
                        </select>
                        <div className="pagination">
                            <button style={{visibility: previousPage ? "visible" : "hidden"}} onClick={HandlePreviousPage}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></button>
                            <p>{pageNumber}</p>
                            <button style={{visibility: NextPage ? "visible" : "hidden"}} onClick={HandleNextPage}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg></button>
                        </div>
                    </div>
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
                            <th>id</th>
                            <th>Letter Event Progress</th>
                            <th>Discord Koens</th>
                            <th>Profile</th>
                        </tr>
                        {inventories.map((item: InventoriesProp) => {
                                if (item.storage === null) {
                                    return null;
                                }
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{ArrangeEventLetters(item.storage)}</td>
                                        <td>{item.koens}</td>
                                        <td className="check-profile"><Link to={`/profile/${item.uid}`} className="profile-button">check profile</Link></td>
                                    </tr>
                                )
                        })}
                    </tbody>
                </table>
                </div>
            </div>
    )
};

export default Inventory;