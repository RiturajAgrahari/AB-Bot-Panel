import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

// import type { Chart, ChartOptions } from 'chart.js';

Chart.register(CategoryScale);

function Charts() {

    const Data = [{id: 1, year: 2016, userGain: 80000, userLost: 823},
        {id: 2, year: 2017, userGain: 45677, userLost: 345},
        {id: 3, year: 2018, userGain: 78888, userLost: 555},
        {id: 4, year: 2019, userGain: 90000, userLost: 4555},
        {id: 5, year: 2020, userGain: 4300, userLost: 234}];

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year), 
        datasets: [
          {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });




    return (
        <div className="Lucky-Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; Charts</p>
                </div>
                <h1>Charts</h1>
                <div className="chart">
                    hii
                <Pie data={chartData} options={{plugins: { title: {display: true, text: "Users Gained between 2016-2020"}}}}/>
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