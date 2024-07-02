import { Link, RedirectFunction } from "react-router-dom";
import "../../styles/statistics.css"
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, ChartData } from "chart.js";
import api from "../../api";

Chart.register(CategoryScale);

interface RecordProps {
    sn: number
    date: string
    number_of_uses: number
}

const LuckyBotStatistics = () => {

    const [record, setRecord] = useState([])
    const [activeButton, setActiveButton] = useState(2)
    const [recordLimit, setRecordLimit] = useState<string>("all")

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
        const FetchRecords = async() => {
            try {
                const response = await api.get(`/api-data/lucky-bot/records/?recordlimit=${recordLimit}`)
                if (response.status == 200) {
                    setRecord(response.data)
                    setChartData({
                        labels: response.data.map((data:RecordProps)=> data.date),
                        datasets: [
                            {
                                label: "Daily Used",
                                data: response.data.map((data:RecordProps) => data.number_of_uses),
                                backgroundColor: ["rgba(75,192,192,1)"],
                                borderColor: "black",
                                borderWidth: 2
                            }
                        ]
                    })
                } 
            } catch (error) {
                console.error("Error Fetching", error)
            }
        }
        FetchRecords();
    }, [recordLimit])

    const NewData = [{'sn': 182, 'date': '2024-02-11', 'number_of_uses': 35}, {'sn': 183, 'date': '2024-02-12', 'number_of_uses': 143}, {'sn': 184, 'date': '2024-02-13', 'number_of_uses': 129}, {'sn':
        185, 'date': '2024-02-14', 'number_of_uses': 126}, {'sn': 186, 'date': '2024-02-15', 'number_of_uses': 105}];

        
        
    // const [chartData, setChartData] = useState<ChartData>({});
    const [chartData, setChartData] = useState({
        labels: NewData.map((data) => data.date), 
        datasets: [
            {
            label: "Daily used ",
            data: NewData.map((data) => data.number_of_uses),
            backgroundColor: [
                "rgba(255,255,255,1)",
            ],
            borderColor: "black",
            borderWidth: 2,
            }
        ]
        });

        
    return (
        <div className="Lucky-Bot">
        <div className="active-component-header">
            <div className="path">
                <Link to={"/"} className="path-link">Dashboard</Link>
                <p>&nbsp; &gt; &nbsp;</p>
                <Link to={"/lucky-bot"} className="path-link">Lucky Bot</Link>
                <p>&nbsp; &gt; Statistics</p>
            </div>
            <h1>Lucky Bot</h1>
            <div className="graph-block">
                <Line data={chartData} options={{plugins: { title: {display: true, text: "Users used the Lucky Bot"}}}}/>
                <div className="graph-limit-buttons">
                    <button className={activeButton == 0 ? "active-button": ""} onClick={()=>{handleGraphLimit(0)}}>1W</button>
                    <button className={activeButton == 1 ? "active-button": ""} onClick={()=>{handleGraphLimit(1)}}>1M</button>
                    <button className={activeButton == 2 ? "active-button": ""} onClick={()=>{handleGraphLimit(2)}}>ALL</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default LuckyBotStatistics;