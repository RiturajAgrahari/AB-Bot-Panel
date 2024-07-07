import BotCard from "../../components/Bot";
import "../../styles/dashboard.css"

const Dashboard = () => {
    return (
        <div className="Dashboard">
            <div className="active-component-header">
                <div className="path">
                    <p>dashboard</p>
                </div>
                <h1>dashboard</h1>
            </div>
            <div className="Bots">
                <BotCard BotName="Lucky Bot" BotPID={21884} status={true} pfp="https://cdn.discordapp.com/avatars/1149306688147562578/e7d9d5880d3b3d666449fcb73f1f9f1a?size=1024"/>
                <BotCard BotName="Fandom Bot" BotPID={21546} status={true} pfp="https://cdn.discordapp.com/avatars/920543899909500999/9bc6f6ac5b8a0581f076d9a9547a31a6?size=1024"/>
                <BotCard BotName="RPG Bot" BotPID={45893} status={true} pfp="https://cdn.discordapp.com/avatars/1199246329600282664/e58e241172d6f07f15c8149724733ea8?size=1024"/>
                <BotCard BotName="Personalized Test Bot" BotPID={0} status={false} pfp="https://cdn.discordapp.com/avatars/1213741122912915516/bc9ab93e5755dd792a5885ff4fbfb6f4?size=1024"/>
            </div>
        </div>
    )
}

export default Dashboard;