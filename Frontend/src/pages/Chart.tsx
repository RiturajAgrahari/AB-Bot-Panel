import { Link } from "react-router-dom";
import Card from "../components/Card";
// import type { Chart, ChartOptions } from 'chart.js';

function Charts() {
    return (
        <div className="Lucky-Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; Charts</p>
                </div>
                <h1>Charts</h1>
                <div className="chart">
                    {/* <Chart
                    type={...}
                    options={...}
                    data={...}
                    {...props}
                    /> */}
                </div>
                <div className="card-container">
                    <Link style={{textDecoration: "none", color: "black"}} to={"inventory/"}><Card Title="Charts" Amount={0} Logo={1}/></Link>
                </div>
            </div>
        </div>
    )
}

export default Charts;