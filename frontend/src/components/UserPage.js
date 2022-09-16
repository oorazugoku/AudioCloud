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
import CursorPlugin from "wavesurfer.js/src/plugin/cursor";
import { setWaveSeek } from "../store/waveSeek";



const UserPage = ({ setLocation }) => {
    const dispatch = useDispatch();
    const songs = useSelector(state => Object.values(state.songs));
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.session.user);
    const songState = useSelector(state => state.song);
    const playing = useSelector(state => state.playing);
    const duration = useSelector(state => state.duration)
    const waveState = useSelector(state => state.wave)
    const [editing, setEditing] = useState(false);
    const [song, setSong] = useState();
    const [loaded, setLoaded] = useState(false);
    const [waves, setWaves] = useState({});
    const [index, setIndex] = useState();

    useEffect(()=>{
        dispatch(getSongs())
    }, [dispatch])


    let check;

    check = document.getElementsByClassName('Stream-songs')
    useEffect(()=>{
        let obj = {}
        if (check) {songs?.map((each, i) => {
            if (user.id === each.artistId) {
                const wave = WaveSurfer.create({
                    container: `.Stream-wave-${each.id}`,
                    height: 50,
                    waveColor: '#333333',
                    progressColor: '#FF5500',
                    barGap: 2,
                    barRadius: 0,
                    barWidth: 1,
                    backgroundColor: 'white',
                    hideScrollbar: true,
                    responsive: true,
                    plugins: [
                        CursorPlugin.create({
                            showTime: false,
                            followCursorY: true,
                            opacity: 1,
                            customShowTimeStyle: {
                                'background-color': '#FF550060'
                            }
                        })
                    ],
                    partialRender: true
                })
                wave.load(each.url)
                obj[each.id] = wave
                setWaves(obj)
                setLoaded(true)
                if (songState?.id === each.id && playing) {
                    setIndex(each.id)
                    wave.setCurrentTime(duration)
                }
                // let number = wave.container.className.split('-')[2]
                // wave.on('seek', ()=> {
                //     if (number == songState?.id) dispatch(setWaveSeek(wave.getCurrentTime()))
                // })
            }
        })}
        return ()=> {
            const array = Object.values(waves)
            array.forEach(each => each.destroy())
            setWaves({})
        }
    }, [check]);

    useEffect(()=>{
        waves[index]?.setCurrentTime(duration)
    }, [duration, index])



    const handleSong = (i) => {
        setIndex(i)
        dispatch(getOneSong(i))
        .then(()=>dispatch(setPlaying(true)))
        .then(()=>{
            waves[i].play()
            waves[i].setMute(true)
        })    }

    const handlePause = (i) => {
        setIndex(i)
        dispatch(setPlaying(false)).then(()=>waves[i].pause())
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
                    {songs?.map((song, i) => user?.id === song.artistId && (
                        <div key={`userpage${i}`} className='Stream-songs'>
                            <div className="Stream-song-image">
                                <img className='Stream-song-image' src={song?.imageURL}/>
                            </div>
                            <div>
                                <div className="Stream-song-header">
                                {songState.id === song.id & playing ? (<button className="play-button" onClick={()=>handlePause(song.id)}><i className="fas fa-pause"/></button>) : (<button className="play-button" onClick={()=>{handleSong(song.id)}}><i className="fas fa-play"/></button>)}
                                <div className="Stream-song-info">
                                    <div className="Stream-song-artist">{users[song.artistId]?.username}</div>
                                    <div className="Stream-song-title">{song?.title.length <= 30 ? song?.title : `${song.title.slice(0,30)}...`}</div>
                                    <section className={`Stream-wave-${song.id}`}></section>
                                    {loaded && (
                                    <>
                                    <div className='UserPage-wave-bottom-overlay-bar'></div>
                                    <div className='UserPage-wave-bottom-overlay'></div>
                                    </>
                                    )}

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
