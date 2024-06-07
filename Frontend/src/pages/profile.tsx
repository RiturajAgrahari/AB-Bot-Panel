interface ProfileProps {
    profile_uid: string;
}

const UserProfile = ({profile_uid}: ProfileProps) => {
    return (
        <div>
            <h1>UID {profile_uid}</h1>
        </div>
    )
};

export default UserProfile;