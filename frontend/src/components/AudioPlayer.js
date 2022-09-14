import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from 'react-player'

import './CSS/AudioPlayer.css';
import { setPlaying } from "../store/playing";
import { getSongComments } from "../store/comments";
import { getSongFromComments } from "../store/songComments";


const AudioPlayer = ({ setLocation }) => {
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

    const handleViewComments = () => {
        dispatch(getSongComments(song.id))
        .then(()=>dispatch(getSongFromComments(song)))
        .then(()=>setLocation('comments'))
    }

    return (
        <>
        <div className="AudioPlayer-Container">
            <ReactPlayer
            className="react-player"
            url={song.url}
            controls={true}
            width={1080}
            height={50}
            playing={playing}
            onPlay={handlePlay}
            onPause={handlePause}
            style={{color:'#FF5500'}}
            />

            {song?.imageURL && (
            <>
            <img className="AudioPlayer-info-image" src={song.imageURL} onClick={handleViewComments}/>
            <div className="AudioPlayer-info-container" onClick={handleViewComments}>
            <div className="AudioPlayer-username">{users[song.artistId].username.length < 20 ? users[song.artistId].username : `${users[song.artistId].username.slice(0,16)}...`}</div>
            <div className="AudioPlayer-song-title">{song.title.length < 16 ? song.title : `${song.title.slice(0,16)}...`}</div>
            </div>
            </>
            )}


        </div>
        </>
    );
};


export default AudioPlayer;
