import "../styles/Card.css"

type CardInfo = {
    Title: string;
    Amount: number;
    Logo: number;
}

function Card({Title, Amount, Logo}: CardInfo) {

    const logo = [
        <svg xmlns="http://www.w3.org/2000/svg" className="cyanish" height="24" viewBox="0 -960 960 960" width="24"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className='orangish' height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z"/></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className='greenish' height="24" viewBox="0 -960 960 960" width="24"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className='redish' height="24px" viewBox="0 -960 960 960" width="24px"><path d="M560-360q17 0 29.5-12.5T602-402q0-17-12.5-29.5T560-444q-17 0-29.5 12.5T518-402q0 17 12.5 29.5T560-360Zm-30-128h60q0-29 6-42.5t28-35.5q30-30 40-48.5t10-43.5q0-45-31.5-73.5T560-760q-41 0-71.5 23T446-676l54 22q9-25 24.5-37.5T560-704q24 0 39 13.5t15 36.5q0 14-8 26.5T578-596q-33 29-40.5 45.5T530-488ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="greenish" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v240h-80v-240H160v525l46-45h394v80H240L80-80Zm80-240v-480 480ZM760-40v-200h-80v-240h200l-68 160h88L760-40Z"/></svg>,
    ]

    return (
        <div className="Card">
            {logo[Logo]}
            <p className="numbers">{Amount}</p>
            <p className="text">{Title}</p>
        </div>
    )
}

export default Card;