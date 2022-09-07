import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditSong from "./EditSong";

import './CSS/UserPage.css'
import { getOneSong } from "../store/song";
import { setPlaying } from "../store/playing";


const UserPage = () => {
    const dispatch = useDispatch();
    const [song, setSong] = useState();
    const songs = useSelector(state => Object.values(state.songs));
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.session.user);
    const [editing, setEditing] = useState(false);
    const songState = useSelector(state => state.song)
    const playing = useSelector(state => state.playing)



    const handleSong = (id) => {
        dispatch(getOneSong(id))
        .then(()=>dispatch(setPlaying(true)))
    }

    const handlePause = () => {
        dispatch(setPlaying(false))
    }

    return (
        <>
        {!editing && (
        <div className="UserPage-Container">
            <div className="UserPage-header">
                <div className="UserPage-header-username">{user?.username}</div>
            </div>
            <div className="UserPage-lower-container">
                <div className="Stream-left-container">
                    {songs?.map((song, i) => song.artistId === user.id && (
                        <div key={`song${i}`} className='Stream-songs'>
                            <div className="Stream-song-image"><img className='Stream-song-image' src={song?.imageURL}/></div>
                            {songState.id === song.id & playing ? (<button className="play-button" onClick={handlePause}><i className="fas fa-pause"/></button>) : (<button className="play-button" onClick={()=>{handleSong(song.id)}}><i className="fas fa-play"/></button>)}
                                <div className="Stream-song-info">
                                    <div className="Stream-song-artist">{users[song.artistId]?.username}</div>
                                    <div className="Stream-song-title">{song?.title}</div>
                                    <div className={`Stream-wave-${i}`}>
                                    </div>
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
            </div>
        </div>)}
            {editing && (
                <EditSong setEditing={setEditing} song={song} />
            )}

        </>
    );
};


export default UserPage;
