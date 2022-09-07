import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
                            <div className="Stream-song-image">
                                <img className='Stream-song-image' src={song?.imageURL}/>
                                </div>
                                {songState.id === song.id & playing ? (<button className="play-button" onClick={handlePause}><i className="fas fa-pause"/></button>) : (<button className="play-button" onClick={()=>{handleSong(song.id)}}><i className="fas fa-play"/></button>)}
                                <div className="Stream-song-info">
                                    <div className="Stream-song-artist">{users[song.artistId]?.username}</div>
                                    <div className="Stream-song-title">{song.title.length <= 30 ? song?.title : `${song.title.slice(0,30)}...`}</div>
                                    <div className={`Stream-wave-${i}`}></div>


                                    {songState.id === song.id & playing ? (<div className="Media-Playing">Playing</div>) : (<></>)}
                                    <div className="Stram-comments-container">
                                        <div className=""></div>
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
            </div>)}
            {editing && (
                <EditSong setEditing={setEditing} song={song} />
            )}

        </>
    );
};


export default Stream;
