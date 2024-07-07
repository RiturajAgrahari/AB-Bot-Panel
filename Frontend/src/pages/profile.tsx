import { useEffect, useState } from "react";
import api from "../api";

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
                <div className="today-luck--info">
                    <h2>Todays Luck</h2>
                    <p><b>Lucky Location:</b> {profileInfo?.location}</p>
                    <p><b>Lucky Container:</b> {profileInfo?.container}</p>
                    <p><b>Lucky Weapon:</b> {profileInfo?.weapon}</p>
                    <p><b>Lucky Item:</b> {profileInfo?.item}</p>
                    <p><b>Lucky Summary:</b> {profileInfo?.summary}</p>
                </div>
                <div className="inventory-info">
                    <h2>Inventory</h2>
                    <p></p>
                </div>
            </div>
        </div>
    )
};

export default UserProfile;