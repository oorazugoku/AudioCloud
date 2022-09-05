import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import './CSS/AudioPlayer.css';


const AudioPlayer = () => {
    const song = useSelector(state => state.songs[1])


    return (
        <>
        <div className="AudioPlayer-Container">
        </div>
        </>
    );
};


export default AudioPlayer;
