import React from "react";
import { useDispatch, useSelector } from "react-redux";

import './CSS/Stream.css'

const Stream = () => {
    const dispatch = useDispatch();
    const song = useSelector(state => state.song)
    const songs = useSelector(state => Object.values(state.songs))
    const users = useSelector(state => state.users)

    return (
        <>
            <div className="Stream-container">

                <div className="Stream-left-container">
                    {songs?.map((song, i) => (
                        <div key={`song${i}`} className='Stream-songs'>
                            <div className="Stream-song-image"><img className='Stream-song-image' src={song?.imageURL}/></div>
                                <div className="Stream-song-info">
                                    <div className="Stream-song-artist">{users[song.artistId]?.username}</div>
                                    <div className="Stream-song-title">{song?.title}</div>
                                    <div className="Stream-song-title">{song?.title}</div>
                                </div>
                        </div>
                    ))}
                </div>

                <div className="Stream-right-container">
                    <div className="Stream-right-inner">
                        STUFF AND THINGS
                    </div>
                </div>
            </div>
        </>
    );
};


export default Stream;
