import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSong } from "../store/song";
import { setPlaying } from "../store/playing";
import CommentBar from "./CommentBar";
import WaveSurfer from 'wavesurfer.js'

import './CSS/Stream.css'
import HireMe from "./HireMe";
import { setWave } from "../store/wave";
import { getSongs } from "../store/songs";
import { setDuration } from "../store/duration";
import CursorPlugin from "wavesurfer.js/src/plugin/cursor";
import player from "react-player";
import { setWaveSeek } from "../store/waveSeek";

const Stream = ({ searched }) => {
    const dispatch = useDispatch();
    const songState = useSelector(state => state.song);
    const songsState = useSelector(state => state.songs);
    const songs = useSelector(state => Object.values(state.songs));
    const numberSongs = songs?.length
    const users = useSelector(state => state.users);
    const playing = useSelector(state => state.playing);
    const waveState = useSelector(state => state.wave);
    const duration = useSelector(state => state.duration);
    const [loaded, setLoaded] = useState(false);
    const [waves, setWaves] = useState({});
    const [currentWave, setCurrentWave] = useState();
    const [index, setIndex] = useState();
    const [check, setCheck] = useState(null);


    useEffect(()=> {
        if (!check) setCheck(document.getElementsByClassName('Stream-songs'))
    }, [check])


    useEffect(()=>{
        const check = Object.values(waves)
        if (check?.length === songs.length) setLoaded(true)
    }, [waves])

    useEffect(()=>{
            let obj = {...waves}
            songs?.map(each => {
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
                interact: false
            })
            wave.load(each.url)
            wave.setVolume(0)
            wave.setMute(true)
            obj[each.id] = wave
            setWaves(obj)

            if (songState?.id === each.id) {
                setIndex(each.id)
                wave.setCurrentTime(duration)
            }
        })
        return ()=> {
            const array = Object.values(waves)
            array.forEach(each => each.destroy())
            setWaves({})
        }
    }, [])

    useEffect(()=>{
        if (check?.length === songs?.length) {
            let obj = {...waves}
            songs?.map(each => {
            if (!waves[each.id]) {
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
                    interact: false
                })

                wave.load(each.url)
                wave.setVolume(0)
                wave.setMute(true)
                obj[each.id] = wave
                setWaves(obj)

                if (songState?.id === each.id) {
                    setIndex(each.id)
                    wave.setCurrentTime(duration)
                }
            }
        })}
        return ()=> {
            const array = Object.values(waves)
            array.forEach(each => each.destroy())
            setWaves({})
        }
    }, [numberSongs])


    useEffect(()=>{
        waves[index]?.setCurrentTime(duration)
    }, [duration, index])

    const handleSong = (i) => {
        setIndex(i)
        if (!currentWave) setCurrentWave(waves[i])
        if (currentWave && currentWave !== waves[i]) {
            currentWave.pause()
            setCurrentWave(waves[i])
        }
        dispatch(getOneSong(i))
        .then(()=>dispatch(setPlaying(true)))
        .then(()=>{
            waves[i]?.play()
            waves[i]?.setMute(true)
        })
        .then(()=>dispatch(setWave(waves[i])))
    }

    const handlePause = (i) => {
        setIndex(i)
        dispatch(setPlaying(false)).then(()=>waves[i].pause())
    }




    return songs && (
        <>
            <div className="Stream-container">
                <div className="Stream-left-container">
                    {songs?.map((song, i) => (
                        <div key={`song${i}`} className='Stream-songs'>
                            <div className="Stream-song-image">
                                <img className='Stream-song-image' src={song?.imageURL}/>
                            </div>
                            <div>
                                <div className="Stream-song-header">
                                {songState.id === song.id && playing ? (<button className="play-button" onClick={()=>handlePause(song.id)}><i className="fas fa-pause"/></button>) : (<button className="play-button" onClick={()=>{handleSong(song.id)}}><i className="fas fa-play"/></button>)}
                                <div className="Stream-song-info">
                                    <div className="Stream-song-artist">{users[song.artistId]?.username}</div>
                                    <div className="Stream-song-title">{song.title.length <= 30 ? song?.title : `${song.title.slice(0,30)}...`}</div>
                                    <section className={`Stream-wave-${song.id}`}></section>
                                    {loaded && (
                                    <>
                                    <div className='wave-bottom-overlay-bar'></div>
                                    <div className='wave-bottom-overlay'></div>
                                    </>
                                    )}

                                    {songState.id === song.id & playing ? (<div className="Media-Playing">Playing</div>) : (<></>)}
                                    </div>
                                    <div className="Stram-comments-container">
                                        <div className=""></div>
                                    </div>
                                </div>
                                    <CommentBar song={song} />
                                </div>
                        </div>
                    )).reverse()}
                </div>

                <div className="Stream-right-container">
                    <div className="Stream-right-inner">
                        <HireMe/>
                    </div>
                </div>
            </div>

        </>
    );
};


export default Stream;
