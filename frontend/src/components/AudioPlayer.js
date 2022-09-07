import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from 'react-player'

import './CSS/AudioPlayer.css';
import { setPlaying } from "../store/playing";


const AudioPlayer = () => {
    const dispatch = useDispatch();
    const song = useSelector(state => state.song)
    const users = useSelector(state => state.users)
    const playing = useSelector(state => state.playing)

    const handlePlay = () => {
        dispatch(setPlaying(true))
    }

    const handlePause = () => {
        dispatch(setPlaying(false))
    }

    return (
        <>
        <div className="AudioPlayer-Container">
            <ReactPlayer
            url={song.url}
            controls={true}
            width={1100}
            height={50}
            playing={playing}
            onPlay={handlePlay}
            onPause={handlePause}
            />

            <div className="AudioPlayer-info-container">
            <div className="AudioPlayer-username">{users[song.artistId]?.username}</div>
            <div className="AudioPlayer-song-title">{song.title}</div>
            </div>


        </div>
        </>
    );
};


export default AudioPlayer;
