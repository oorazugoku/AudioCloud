import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer.js';
import EditSong from "./EditSong";


import './CSS/Stream.css'
import { getOneSong } from "../store/song";
import { setPlaying } from "../store/playing";

const Stream = ({ setLocation }) => {
    const dispatch = useDispatch();
    const [song, setSong] = useState();
    const songState = useSelector(state => state.song)
    const songs = useSelector(state => Object.values(state.songs));
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.session.user);
    const [editing, setEditing] = useState(false);
    const playing = useSelector(state => state.playing)
    // const [eachAudio, setEachAudio] = useState({});
    // const [url, setUrl] = useState()



    // useEffect(()=>{
    //     let newAudio = {}
    //     songs?.map((song, i) => {
    //             let wave = new Audio(song.url);
    //             const audio = WaveSurfer.create({
    //                 container: `.Stream-wave-${i}`,
    //                 barWidth: 1,
    //                 barRadius: 1,
    //                 height: 0,
    //                 maxCanvasWidth: 700,
    //                 // barHeight: 100,
    //                 waveColor: 'violet',
    //                 progressColor: 'purple',
    //                 normalize: true,
    //                 scrollParent: true,
    //                 mediaType: 'audio',
    //                 mediaControls: true,
    //                 responsive: true,
    //                 hideScrollbar: true,
    //                 // preload: true,
    //                 data: wave,
    //                 backend: 'MediaElement',
    //                 xhr: {
    //                     mode: "no-cors",
    //                     method: "GET",
    //                     credentials: "include"
    //                 }
    //             });

    //             // wave.preload = true
    //             // wave.src = song.url
    //             audio.song = song.url
    //             audio.drawBuffer()
    //             // console.log(wave)
    //             // audio.load(wave)
    //             audio.load(audio.song)
    //             newAudio[i] = audio
    //         })

    //         setEachAudio(newAudio)

    // }, [])

    const handleSong = (id) => {
        dispatch(getOneSong(id))
        .then(()=>dispatch(setPlaying(true)))
    }

    const handlePause = () => {
        dispatch(setPlaying(false))
    }


    return (
        <>
            {!editing && (<div className="Stream-container">

                <div className="Stream-left-container">
                    {songs?.map((song, i) => (
                        <div key={`song${i}`} className='Stream-songs'>
                            <div className="Stream-song-image"><img className='Stream-song-image' src={song?.imageURL}/></div>
                                {songState.id === song.id & playing ? (<button className="play-button" onClick={handlePause}><i className="fas fa-pause"/></button>) : (<button className="play-button" onClick={()=>{handleSong(song.id)}}><i className="fas fa-play"/></button>)}
                                <div className="Stream-song-info">
                                    <div className="Stream-song-artist">{users[song.artistId]?.username}</div>
                                    <div className="Stream-song-title">{song?.title}</div>
                                    <div className={`Stream-wave-${i}`}></div>
                                </div>
                                {user.id === song.artistId && (<button className="Stream-song-edit-button" onClick={()=>{setEditing(true); setSong(song)}}>Edit</button>)}
                        </div>
                    ))}
                </div>

                <div className="Stream-right-container">
                    <div className="Stream-right-inner">
                        STUFF AND THINGS
                    </div>
                </div>
            </div>)}
            {editing && (
                <EditSong setEditing={setEditing} song={song} />
            )}

        </>
    );
};


export default Stream;
