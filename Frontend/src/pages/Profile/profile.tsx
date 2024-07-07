import { useEffect, useState } from "react";
import api from "../../api";
import "../../styles/profile.css"

interface ProfileProps {
    profile_uid: string;
}

interface ProfileDataProps {
    uid: number
    name: string
    discord_id: string
    event_used: string
    last_used_on: string
    achievement: string
    storage: string
    koens: number
    status: string
    location: string
    container: string
    weapon: string
    item: string
    summary: string
}

const UserProfile = ({profile_uid}: ProfileProps) => {

    const [profileInfo, setProfileInfo] = useState<ProfileDataProps>()

    function FormatStorage(letters: string | undefined) {
        const letters_Array = letters ? letters.split(",") : [] ;

        const FormateTexts = (letter: string) => {
            const letterIndex = letters_Array.indexOf(letter);
            if (letterIndex !== -1) {
                letters_Array.splice(letterIndex, 1); // Remove the letter from the array
                return { color: "rgb(67, 161, 67)", fontWeight: 700};
            } else {
                return { color: "rgb(169, 169, 169)", fontWeight: 700 };
            }
        };

        return (
            <div style={{display: "flex", marginLeft: "5px", fontSize: "18px"}}>
                <p style={FormateTexts("A")}>A&nbsp;</p>
                <p style={FormateTexts("R")}>R&nbsp;</p>
                <p style={FormateTexts("E")}>E&nbsp;</p>
                <p style={FormateTexts("N")}>N&nbsp;</p>
                <p style={FormateTexts("A")}>A&nbsp;&nbsp;&nbsp;</p>
                <p style={FormateTexts("B")}>B&nbsp;</p>
                <p style={FormateTexts("R")}>R&nbsp;</p>
                <p style={FormateTexts("E")}>E&nbsp;</p>
                <p style={FormateTexts("A")}>A&nbsp;</p>
                <p style={FormateTexts("K")}>K&nbsp;</p>
                <p style={FormateTexts("O")}>O&nbsp;</p>
                <p style={FormateTexts("U")}>U&nbsp;</p>
                <p style={FormateTexts("T")}>T&nbsp;</p>
            </div>
        )
    }

    useEffect(() => {
        const FetchProfile = async() => {
            try {
                const res = await api.get(`/api-data/profiles/profile/?uid=${profile_uid}`)
                if (res.status == 200) {
                    console.log(res)
                    setProfileInfo(res.data)
                }
            } catch (error) {
                console.error("Error Fetching", error)
            }
        }

        FetchProfile();
    }, [])

    return (
        <div>
            <h1>UID {profile_uid} :</h1>
            <div className="profile-info">
                <div className="discord-info">
                    <h1>{profileInfo?.name}</h1>
                    <p>{profileInfo?.discord_id}</p>
                </div>
                <div className="today-luck-info">
                    
                <h2>Todays Luck</h2>
                <div className="today-luck-data">
                    <div className="lucky-data">
                        <b>Lucky Location:</b>
                        <p>{profileInfo?.location ?? "N/A"}</p>
                    </div>
                    <div className="lucky-data">
                        <b>Lucky Container:</b>
                        <p>{profileInfo?.container ?? "N/A"}</p>
                    </div>
                    <div className="lucky-data">
                        <b>Lucky Weapon:</b>
                        <p>{profileInfo?.weapon ?? "N/A"}</p>
                    </div>
                    <div className="lucky-data">
                        <b>Lucky Item:</b>
                        <p>{profileInfo?.item ?? "N/A"}</p>
                    </div>
                    <div className="lucky-data">
                        <b>Lucky Summary:</b>
                        <p>{profileInfo?.summary ?? "N/A"}</p>
                    </div>
                    </div>
                </div>

                <div className="inventory-info">
                    <h2>Inventory</h2>
                    <div className="koen-info">
                     <b>Koens :</b> <p>&nbsp; {profileInfo?.koens ?? "N/A"}</p> 
                     {
                        profileInfo?.koens ? <img src="https://cdn.discordapp.com/emojis/1211589943147892756.webp?size=60&quality=lossless" alt="koen" /> : <></>
                     }
                    </div>
                     <div className="letter-event">
                     <b>Letter Event :</b> <div>{FormatStorage(profileInfo?.storage)}</div>
                 </div>
                </div>


            </div>
        </div>
    )
};

export default UserProfile;