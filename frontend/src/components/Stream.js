import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSong } from "../store/song";
import { setPlaying } from "../store/playing";
import CommentBar from "./CommentBar";
import WaveSurfer from 'wavesurfer.js'

import './CSS/Stream.css'
import HireMe from "./HireMe";

const Stream = ({ setLocation }) => {
    const dispatch = useDispatch();
    const songState = useSelector(state => state.song);
    const songs = useSelector(state => Object.values(state.songs));
    const users = useSelector(state => state.users);
    const playing = useSelector(state => state.playing);
    const [comment, setComment] = useState('');
    const [loaded, setLoaded] = useState(false);

    let wave;
    let check;

    useEffect(()=>{
        check = document.getElementsByClassName('Stream-songs')
        if (check) {songs?.map((each, i) => {
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
        })}
    }, [check])


    const handleSong = (id) => {
        dispatch(getOneSong(id))
        .then(()=>dispatch(setPlaying(true)))
    }

    const handlePause = () => {
        dispatch(setPlaying(false))
    }




    return (
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
                                {songState.id === song.id & playing ? (<button className="play-button" onClick={handlePause}><i className="fas fa-pause"/></button>) : (<button className="play-button" onClick={()=>{handleSong(song.id)}}><i className="fas fa-play"/></button>)}
                                <div className="Stream-song-info">
                                    <div className="Stream-song-artist">{users[song.artistId]?.username}</div>
                                    <div className="Stream-song-title">{song.title.length <= 30 ? song?.title : `${song.title.slice(0,30)}...`}</div>
                                    <div className={`Stream-wave-${i}`}></div>
                                    <div className='wave-bottom-overlay-bar'></div>
                                    <div className='wave-bottom-overlay'></div>

                                    {songState.id === song.id & playing ? (<div className="Media-Playing">Playing</div>) : (<></>)}
                                    </div>
                                    <div className="Stram-comments-container">
                                        <div className=""></div>
                                    </div>
                                </div>
                                    <CommentBar song={song} setLocation={setLocation} />
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
