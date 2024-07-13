import { Link } from "react-router-dom";
import "../../styles/notFound.css"

function NotFound() {
    return (
        <div className="not-found">
            <h1>404 Not Found</h1>
            <p>The page you're looking for doesn't exist!</p>
            <Link to={"/"} className="go-home">Go Back to dashboard</Link>
        </div>
    )
}

export default NotFound;