import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSong } from "../store/song";
import { setPlaying } from "../store/playing";
import { getSongs } from "../store/songs";
import EditSong from "./EditSong";
import HireMe from "./HireMe";
import CommentBar from "./CommentBar";
import WaveSurfer from 'wavesurfer.js'

import './CSS/UserPage.css'



const UserPage = ({ setLocation }) => {
    const dispatch = useDispatch();
    const songs = useSelector(state => Object.values(state.songs));
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.session.user);
    const songState = useSelector(state => state.song)
    const playing = useSelector(state => state.playing)
    const [editing, setEditing] = useState(false);
    const [song, setSong] = useState();
    const [loaded, setLoaded] = useState(false);
    const [waves, setWaves] = useState({})

    console.log(songs)

    let wave;
    let check;

    check = document.getElementsByClassName('Stream-songs')
    useEffect(()=>{
        let obj = {...waves}
        if (check) {songs?.map((each, i) => {
            if (user.id === each.artistId) {
                wave = WaveSurfer.create({
                    container: `.Stream-wave-${i}`,
                    height: 50,
                    waveColor: '#333333',
                    progressColor: '#FF5500',
                    barGap: 2,
                    barRadius: 0,
                    barWidth: 2,
                    hideScrollbar: true,
                    responsive: true,

                })
                wave.load(each.url)
                obj[i] = wave
                setWaves(obj)
            }
        })}
    }, [check])


    useEffect(()=>{
        dispatch(getSongs()).then(()=>setLoaded(true))
    }, [dispatch])

    const handleSong = (id, i) => {
        dispatch(getOneSong(id))
        .then(()=>dispatch(setPlaying(true)))
        .then(()=>waves[i].playPause())
    }

    const handlePause = (i) => {
        dispatch(setPlaying(false)).then(()=>waves[i].playPause())
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
                    {songs?.map((song, i) => user.id === song.artistId && (
                        <div key={`song${i}`} className='Stream-songs'>
                            <div className="Stream-song-image">
                                <img className='Stream-song-image' src={song?.imageURL}/>
                            </div>
                            <div>
                                <div className="Stream-song-header">
                                {songState.id === song.id & playing ? (<button className="play-button" onClick={()=>handlePause(i)}><i className="fas fa-pause"/></button>) : (<button className="play-button" onClick={()=>{handleSong(song.id, i)}}><i className="fas fa-play"/></button>)}
                                <div className="Stream-song-info">
                                    <div className="Stream-song-artist">{users[song.artistId]?.username}</div>
                                    <div className="Stream-song-title">{song?.title.length <= 30 ? song?.title : `${song.title.slice(0,30)}...`}</div>
                                    <section className={`Stream-wave-${i}`}></section>
                                    <div className='UserPage-wave-bottom-overlay-bar'></div>
                                    <div className='UserPage-wave-bottom-overlay'></div>

                                    {songState.id === song.id & playing ? (<div className="Media-Playing">Playing</div>) : (<></>)}
                                    </div>
                                    <div className="Stram-comments-container">
                                        <div className=""></div>
                                    </div>
                                </div>
                                    <CommentBar song={song} setLocation={setLocation} />
                                </div>


                                {user.id === song.artistId && (<i className="fas fa-pen-to-square" onClick={()=>{setEditing(true); setSong(song)}}/>)}
                        </div>
                    )).reverse()}
                </div>

                <div className="Stream-right-container">
                    <div className="Stream-right-inner">
                        <HireMe/>
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
