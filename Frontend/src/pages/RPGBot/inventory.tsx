import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
// import { API } from "../constants"
import "../../styles/inventory.css"
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
    const [searchFor, setSearchFor] = useState("")
    const [loading, setLoading] = useState(false)
    const [previousPage, setPreviousPage] = useState(false)
    const [NextPage, setNextPage] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [path, setPath] = useState("/api-data/rpg-bot/inventories/")
    const [nextPageLink, setNextPageLink] = useState("")
    const [previousPageLink, setPreviousPageLink] = useState("")
    const [pageitems, setPageitems] = useState("10")

    useEffect(() => {
        const FetchInventory = async () => {
            setLoading(true)
            console.log(path)
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

                        setInventories(res.data.results)
                        console.log(res.data.results)
                   } 
            } catch (error) {
                console.error("Error Fetching", error)
            } finally {
                setLoading(false)
            }
        }

        FetchInventory();
    }, [searchFor, filterEmptyInventories, pageNumber, path, pageitems])

    // Set how much items per page must be rendered!
    const HandleItemsPerPage = (e:React.FormEvent<HTMLSelectElement>) => {
        setPath(`/api-data/rpg-bot/inventories/?pageitems=${e.currentTarget.value}&`)
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

    const HandleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchFor(e.currentTarget.value)
        // if (path.endsWith("/")) {
        //     setPath(`${path}?searchfor=${e.currentTarget.value}`)
        // } else {
        //     setPath(`${path}&searchfor=${e.currentTarget.value}`)
        // }
        // console.log(path)
    }


    const HandleFilter = () => {
        setFilterEmptyInventories(!filterEmptyInventories)
        setPath(`${path}?filter=${filterEmptyInventories}`)
        console.log(path)
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

    return (
        <div className="Inventory">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt;</p>
                    <Link to={"/rpg_bot"} className="path-link">RPG Bot</Link>
                    <p>&nbsp; &gt; Inventory</p>
                </div>
                <h1>RPG Bot</h1>
                <div className="search-bar">
                    <input type="text" className="search" placeholder="Search" autoComplete="false" onChange={(e) => {HandleSearch(e)}} disabled></input>
                    <input type="checkbox" onChange={HandleFilter}></input>
                    <p>Filter user with no words</p>
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
                <div className="loader" style={{display: loading ? "flex" : "none"}}>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>Letter Event Progress</th>
                            <th>Discord Koens</th>
                            <th>Profile</th>
                        </tr>
                        {inventories.map((item: InventoriesProp) => {
                                if (filterEmptyInventories && item.storage === null) {
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