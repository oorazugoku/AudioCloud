import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from 'react-player'

import './CSS/AudioPlayer.css';
import { setPlaying } from "../store/playing";
import { getSongComments } from "../store/comments";
import { getSongFromComments } from "../store/songComments";
import { setWave } from "../store/wave";
import { setDuration } from "../store/duration";
import { useHistory } from "react-router-dom";


const AudioPlayer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const song = useSelector(state => state.song)
    const users = useSelector(state => state.users)
    const playing = useSelector(state => state.playing)
    const wave = useSelector(state => state.wave)

    const handleProgress = (progress) => {
        dispatch(setDuration(progress.playedSeconds))
    }

    const handlePlay = () => {
        dispatch(setPlaying(true)).then(()=>wave?.play())
    }

    const handlePause = () => {
        dispatch(setPlaying(false)).then(()=>wave?.pause())
    }

    const handleViewComments = () => {
        dispatch(getSongComments(song.id))
        .then(()=>dispatch(getSongFromComments(song)))
        .then(()=>history.push('/comments'))
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
            onProgress={handleProgress}
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
