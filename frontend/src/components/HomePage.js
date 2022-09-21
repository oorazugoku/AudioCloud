import React, { useEffect, useState } from 'react';
import { Modal } from './context/Modal';
import Slide from './Slide';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import logoWhite from './images/Audiocloud-white.svg';
import linked from './images/Linkedin.png';
import git from './images/github.png';


import './CSS/HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../store/songs';
import AudioPlayer from './AudioPlayer';
import { getOneSong } from '../store/song';
import { setPlaying } from '../store/playing';


const HomePage = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [songPlaying, setSongPlaying] = useState(false);
    const users = useSelector(state => state.users);
    const songState = useSelector(state => state.song);
    const playing = useSelector(state => state.playing);
    const songs = useSelector(state => Object.values(state.songs).slice(0, 10));
    const sortedSongs = songs.sort((a,b)=> b.songLikes.length - a.songLikes.length);
    const [hover, setHover] = useState();


    useEffect(()=>{
        dispatch(getSongs()).then(()=>setLoaded(true));
    }, [loaded]);

    const handlePlaySong = (song) => {
        dispatch(getOneSong(song.id))
        .then(()=>setSongPlaying(true))
        .then(()=>dispatch(setPlaying(true)))
    }

    const handlePause = () => {
        dispatch(setPlaying(false))

    }

    return loaded && (
        <>
        <div className='HomePage-Container'>
            <div className='HomePage-NavBar'>
            <div className='HomePage-navbar-left'><img className='HomePage-logo' src={logoWhite}/></div>
                <div className='HomePage-navbar-right'>

                    <button className='login-button' onClick={()=>setShowModal(true)}>Sign In</button>
                    <button className='signup-button' onClick={()=>setShowSignupModal(true)}>Create Account</button>

                </div>
            </div>
            <div className='HomePage-header-images'>
                <Slide/>
            </div>
            <div className='HomePage-body'>
                <div className='HomePage-body-text'>
                    Hear what’s trending for free in the AudioCloud community
                </div>

                <div className="HomePage-songs-container">
                    {sortedSongs?.map(song => (<div key={song.id}>
                        <div className='HomePage-song-container'>
                            <div className='HomePage-song-image-container' onMouseEnter={()=>setHover(song.id)} onMouseLeave={()=>setHover(0)}>
                                <img src={song.imageURL} className="HomePage-song-image" />
                                {songState.id === song.id && playing ? hover === song.id && (<button className="HomePage-play-button" onClick={()=>handlePause()}><i className="fas fa-pause"/></button>) : hover === song.id && (<button className="HomePage-play-button" onClick={()=>{handlePlaySong(song)}}><i className="fas fa-play"/></button>)}
                            </div>


                            <div className='HomePage-song-info'>
                                <div className='HomePage-song-title'>{song.title.length <= 18 ? song.title : `${song.title.slice(0,18)}...`}</div>
                                <div className='HomePage-song-artist'>{users[song.artistId]?.username.length <= 22 ? users[song.artistId]?.username : `${users[song.artistId]?.username.slice(0,22)}...`}</div>
                            </div>

                        </div>
                    </div>))}
                </div>

            </div>
            <div className='HomePage-section2'>
                    <div>
                    Audiocloud, inspired by<a className='HomePage-links' href='https://www.soundcloud.com' target='_blank' style={{ color: 'white' }}>Soundcloud</a>
                    </div>
                    <div className='HomePage-link-container'>
                    <div className='HomePage-LinkedIn'>
                        <img className='HomePage-logos' src={linked}/>
                    </div>
                    <a className='HomePage-links' href='https://www.linkedin.com/in/benjamin-durham-full-stack/' target='_blank' style={{ color: 'white' }}>LinkedIn</a>
                    </div>
                    <div className='HomePage-link-container'>
                    <div className='HomePage-GitHub'>
                        <img className='HomePage-logos' src={git}/>
                    </div>
                    <a className='HomePage-links' href='https://github.com/oorazugoku/AudioCloud' target='_blank' style={{ color: 'white' }}>GitHub</a>
                    </div>
            </div>
        </div>

        {/* <div className="UserNav-bottom-navbar">
                {songPlaying && (<AudioPlayer />)}
        </div> */}
        {showModal && (
            <>
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal}/>
                </Modal>
            </>
        )}
        {showSignupModal && (
            <>
                <Modal onClose={() => setShowSignupModal(false)}>
                    <SignupForm setShowSignupModal={setShowSignupModal}/>
                </Modal>
            </>
        )}
        </>
    )
}

export default HomePage;
