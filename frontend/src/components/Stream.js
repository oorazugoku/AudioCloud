import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer.js';
import EditSong from "./EditSong";
import audio1 from './SoBad.mp3'


import './CSS/Stream.css'

const Stream = ({ setLocation }) => {
    const dispatch = useDispatch();
    const [song, setSong] = useState();
    const songs = useSelector(state => Object.values(state.songs));
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.session.user);
    const [editing, setEditing] = useState(false);
    const [eachAudio, setEachAudio] = useState({});
    const [done, setDone] = useState(false)



    useEffect(()=>{
        let newAudio = {}
        songs?.map((song, i) => {
                let wave = new Audio(song.url);
                const audio = WaveSurfer.create({
                    container: `.Stream-wave-${i}`,
                    barWidth: 1,
                    barRadius: 1,
                    height: 100,
                    maxCanvasWidth: 700,
                    // barHeight: 100,
                    waveColor: 'violet',
                    progressColor: 'purple',
                    normalize: true,
                    scrollParent: true,
                    mediaType: 'audio',
                    responsive: true,
                    hideScrollbar: true,
                    // preload: true,
                    data: wave,
                    backend: 'MediaElement',
                    xhr: {
                        mode: "no-cors",
                        method: "GET",
                        credentials: "include"
                    }
                });

                // wave.preload = true
                // wave.src = song.url
                audio.song = song.url
                audio.drawBuffer()
                // console.log(wave)
                // audio.load(wave)
                audio.load(audio.song)
                newAudio[i] = audio
            })

            setEachAudio(newAudio)

    }, [])


    return (
        <>
            {!editing && (<div className="Stream-container">

                <div className="Stream-left-container">
                    {songs?.map((song, i) => (
                        <div key={`song${i}`} className='Stream-songs'>
                            <div className="Stream-song-image"><img className='Stream-song-image' src={song?.imageURL}/></div>
                                <div className="Stream-song-info">
                                    <div className="Stream-song-artist">{users[song.artistId]?.username}</div>
                                    <div className="Stream-song-title">{song?.title}</div>
                                    <div className={`Stream-wave-${i}`}>
                                        <button className="play-pause-button" onClick={()=>eachAudio[i].playPause()}>Play/Pause</button>
                                    </div>
                                    <div className="Stream-song-description">{song?.description}</div>
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
