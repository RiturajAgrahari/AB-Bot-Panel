import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { BarElement, CategoryScale, ChartData, Legend, LinearScale, Tooltip } from "chart.js";
import api from "../api";

// import type { Chart, ChartOptions } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BotInfoProps {
    date: string
    fandom_bot: number
    lucky_bot: number
    rpg_bot: number
    sn: number
}



function Charts() {

    const [record, setRecord] = useState([])

    useEffect(() => {
        const fetchBotInfo = async() => {
            try {
                const res = await api.get("/api-data/bots/usage-information/")
                if (res.status == 200) {
                    setRecord(res.data)
                    setChartData({
                        labels: res.data.map((data: BotInfoProps) => data.date),
                        datasets: [
                        {
                            label: "RPG Bot Usage",
                            data: res.data.map((data: BotInfoProps) => (data.rpg_bot)),
                            backgroundColor:["rgba(255, 99, 132, 0.2)"],
                            borderColor: "rgba(255, 99, 132)",
                            borderWidth: 2,
                            
                        },
                        {
                            label: "Lucky Bot Usage",
                            data: res.data.map((data: BotInfoProps) => (data.lucky_bot)),
                            backgroundColor:["rgba(255, 159, 64, 0.2)"],
                            borderColor: "rgb(255, 159, 64)",
                            borderWidth: 2
                        },
                        {
                            label: "Fandom Bot Usage",
                            data: res.data.map((data: BotInfoProps) => (data.fandom_bot)),
                            backgroundColor:["rgba(75, 192, 192, 0.2)"],
                            borderColor: "rgb(75, 192, 192)",
                            borderWidth: 2
                            
                        }
                    ]
                    })
                }
            } catch (error) {
                console.error("Fetching Error", error)
            }
        }

        fetchBotInfo();
    }, [])

    const Data = [{id: 1, year: 2016, userGain: 80000, userLost: 823},
        {id: 2, year: 2017, userGain: 45677, userLost: 345},
        {id: 3, year: 2018, userGain: 78888, userLost: 555},
        {id: 4, year: 2019, userGain: 90000, userLost: 4555},
        {id: 5, year: 2020, userGain: 4300, userLost: 234}];

    interface ChartDataDatasetElementProps {
        label: string
        data: number[] | string[]
        backgroundColor: string[]
        borderColor: string
        borderWidth: number
    }

    interface ChartDataProps {
        labels: number[] | string[]
        datasets: Chart[]
    }

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year), 
        datasets: [
          {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
            backgroundColor: ["rgba(75,192,192,1)"],
            borderColor: "black",
            borderWidth: 2,
          },
          {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
            backgroundColor: ["rgba(75,192,192,1)"],
            borderColor: "black",
            borderWidth: 2
          },
          {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
            backgroundColor: ["rgba(75,192,192,1)"],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });

    
    const options = {
        scales: {
            x: {stacked: true},
            y: {stacked: true, beginAtZero: true}
        }
    }


    return (
        <div className="Lucky-Bot">
            <div className="active-component-header">
                <div className="path">
                    <Link to={"/"} className="path-link">Dashboard</Link>
                    <p>&nbsp; &gt; Charts</p>
                </div>
                <h1>Charts</h1>
                <div className="chart">
                <Bar data={chartData} options={options}/>
                </div>
            </div>
        </div>
    )
}

export default Charts;