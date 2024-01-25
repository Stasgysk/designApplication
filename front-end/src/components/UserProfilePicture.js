import {useState} from "react";

function UserProfilePicture(props) {
    const [imgError, setImgError] = useState(false);

    if (!imgError) {
        return (
            <img id="profile-picture"
                src={props.url}
                onError={() => setImgError(true)}
                alt="profilePicture"/>
        )
    } else {
        return <img id="profile-picture" src="/default_profile_picture.jpg"  alt="profilePicture"/> // with no onError
    }
}

export default UserProfilePicture;