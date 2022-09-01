import React from "react";
import AudioPlayer from "./AudioPlayer";

import './CSS/UserNav.css'
import UserPage from "./UserPage";


const UserNav = () => {
    return (
        <>
        <div className="UserNav-Container">
            <div className="UserNav-top-navbar">

            </div>
                <UserPage />
            <div className="UserNav-bottom-navbar">
                <AudioPlayer />
            </div>
        </div>
        </>
    );
};


export default UserNav;
