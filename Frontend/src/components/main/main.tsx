import "../../styles/home.css"
import { Link } from "react-router-dom"


type PageDetails = {
    pageName: string
}

function Main(props: PageDetails) {
    return(
        <div className="Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; &nbsp;Lucky Bot</p>
                </div>
                <h1>{props.pageName}</h1>
            </div>
            <div className="card-container">
                {/* <Link className="card-linking" style={{textDecoration: "none", color: "black"}} to={"profiles/"}><Card Title="Today's Drops" Amount={totalTodayLuck} Logo={0}/></Link> */}
                {/* <Link className="card-linking" style={{textDecoration: "none", color: "black"}} to={"statistics/"}><Card Title="Statistics" Amount={"Graph"} Logo={5}/></Link> */}
                {/* <Link className="card-linking" style={{textDecoration: "none", color: "black"}} to={"bot-reviews/"}><Card Title="Reviews" Amount={totalReviews} Logo={4}/></Link> */}
            </div>
        </div>
    )
}

export default Main;