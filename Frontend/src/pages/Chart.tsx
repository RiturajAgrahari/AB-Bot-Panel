import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { BarElement, CategoryScale, Legend, LinearScale, Tooltip } from "chart.js";
import api from "../api";
import "../styles/home.css"

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

    // const [record, setRecord] = useState([])
    const [activeButton, setActiveButton] = useState(2)
    const [recordLimit, setRecordLimit] = useState<string>("all")

    const alertMessage = useRef<HTMLDivElement>(null)


    const handleGraphLimit = (n: number) => {
        setActiveButton(n);
        if (n == 0) {
            setRecordLimit("week")
        } else if (n == 1) {
            setRecordLimit("month")
        } else {
            setRecordLimit("all")
        }
    }

    useEffect(() => {
        const fetchBotInfo = async() => {
            try {
                const res = await api.get(`/api-data/bots/usage-information/?recordlimit=${recordLimit}`)
                if (res.status == 200) {
                    // setRecord(res.data)
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
                handleShowAlertMessage();
                console.error("Fetching Error", error)
            }
        }

        fetchBotInfo();
    }, [recordLimit])

    const Data = [{id: 1, year: 2016, userGain: 80000, userLost: 823},
        {id: 2, year: 2017, userGain: 45677, userLost: 345},
        {id: 3, year: 2018, userGain: 78888, userLost: 555},
        {id: 4, year: 2019, userGain: 90000, userLost: 4555},
        {id: 5, year: 2020, userGain: 4300, userLost: 234}];

    // interface ChartDataDatasetElementProps {
    //     label: string
    //     data: number[] | string[]
    //     backgroundColor: string[]
    //     borderColor: string
    //     borderWidth: number
    // }

    // interface ChartDataProps {
    //     labels: number[] | string[]
    //     datasets: Chart[]
    // }

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
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {stacked: true},
            y: {stacked: true, beginAtZero: true}
        }
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
                    <p>&nbsp; &gt; Charts</p>
                </div>
                <h1>Charts</h1>
            </div>
            <div className="chart">
                <Bar className="Bar-chart" data={chartData} options={options}/>
                <div className="graph-limit-buttons">
                    <button className={activeButton == 0 ? "active-button": ""} onClick={()=>{handleGraphLimit(0)}}>1W</button>
                    <button className={activeButton == 1 ? "active-button": ""} onClick={()=>{handleGraphLimit(1)}}>1M</button>
                    <button className={activeButton == 2 ? "active-button": ""} onClick={()=>{handleGraphLimit(2)}}>ALL</button>
                </div>
            </div>
        </div>        

    )
}

export default Charts;