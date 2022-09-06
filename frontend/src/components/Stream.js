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



    useEffect(()=>{
        songs?.map((song, i) => {
            const audio = WaveSurfer.create({
                container: `.Stream-wave-${i}`,
                waveColor: 'violet',
                progressColor: 'purple',
                xhr: {
                    mode: "no-cors",
                    method: "GET",
                    credentials: "include"
                }
            });
            audio.load(`${song.url}`)
        })

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
                                    <div className={`Stream-wave-${i}`}></div>
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
