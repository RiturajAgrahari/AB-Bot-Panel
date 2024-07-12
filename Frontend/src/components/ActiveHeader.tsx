// import { Link } from "react-router-dom";
import "../styles/activeHeader.css"

interface ActiveHeaderProps {
    title: string;
    path: {number: string}[];
}

function ActiveHeader(props: ActiveHeaderProps) {

    console.log(props.path)

    // const HeaderPath = props.path.map((item: string) => (
    //     <>
    //         <Link to={item} className="header-path-link">{item} &nbsp; &gt; &nbsp;</Link>
    //     </>
    // ));

    return (
        <div className="active-component-header">
            <div className="path">
                {/* {HeaderPath} */}
            </div>
            <h1>{props.title}</h1>
        </div>
    )
}

export default ActiveHeader;