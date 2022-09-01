import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";

import './CSS/UserNav.css'
import UserPage from "./UserPage";


const UserNav = () => {
    const [file, setFile] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }


    return (
        <>
        <div className="UserNav-Container">
            <div className="UserNav-top-navbar">
            <form onSubmit={handleSubmit}>
            <label>
              <input type="file" onChange={(e)=>setFile(e.target.value)} />
            </label>
                <button type="submit">Upload</button>
            </form>
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
