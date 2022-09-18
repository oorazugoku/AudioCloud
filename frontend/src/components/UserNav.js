import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import * as sessionActions from '../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getSongs } from "../store/songs";
import { setPlaying } from "../store/playing";
import { getUsers } from "../store/users";
import { removeSong } from "../store/song";
import { getAllLikes } from "../store/likes";
import SearchBar from './SearchBar'
import logoBB from './images/cloud-BB.png';
import logoPB from './images/cloud-PB.png';
import logoPO2 from './images/cloud-PO2.png';
import logoWhite from './images/cloud-white.png';
import logoYO from './images/cloud-YO.png';


import './CSS/UserNav.css';
import { setWaveSeek } from "../store/waveSeek";


const UserNav = () => {
    const dispatch = useDispatch();
    const locate = useLocation().pathname;
    const history = useHistory();
    const [file, setFile] = useState('');
    const [location, setLocation] = useState();
    const [logo, setLogo] = useState(null);
    const [dots, setDots] = useState(false);
    const user = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [logoDiv, setLogoDiv] = useState(0);
    const [searched, setSearched] = useState(false);
    const waveSeek = useSelector(state => state.waveSeek);
    const wave = useSelector(state => state.wave);
    const song = useSelector(state => state.song)

    useEffect(()=>{
      if (user) setIsLoaded(true)
    }, [dispatch, user, searched])

    useEffect(()=>{
        dispatch(getSongs())
        .then(()=>{
            setLocation('/stream')
            history.push('/stream')
        })
        dispatch(getUsers())
        dispatch(getAllLikes())
    }, [])

    useEffect(()=>{
        setLocation(locate)
        if (wave) {
            const data = {
                id: song.id,
                time: wave.getCurrentTime()
            }
            dispatch(setWaveSeek(data))
        }
    }, [locate]);

    useEffect(()=>{
        logoChanger();
    }, [location]);

    const clickHome = () => {
        dispatch(getSongs()).then(()=>{
            setDots(false);
            history.push('/home')
        })
    };

    const clickStream = () => {
        setDots(false);
        history.push('/stream')
    };

    const clickUpload = () => {
        setDots(false);
        history.push('/upload')
    };

    const clickDots = () => {
        setDots(!dots);
    };

    const logout = () => {
        dispatch(sessionActions.logout())
        .then(()=>dispatch(setPlaying(false)))
        .then(()=>dispatch(removeSong()))
        history.push('/')
    };

    const logoChanger = () => {
        if (!location) setLogo(logoWhite);
        if (location === '/home') setLogo(logoBB);
        if (location === '/editSong') setLogo(logoBB);
        if (location === '/stream') setLogo(logoPO2);
        if (location === '/upload') setLogo(logoYO);
        if (location === '/comments') setLogo(logoPB);
    };


    return isLoaded && (
        <>
        <div className="UserNav-Container">
            <div className="UserNav-top-navbar-container">
                <div className="UserNav-top-navbar">
                    <div className="UserNav-top-navbar-left">
                        <div className='UserNav-logo' onMouseEnter={()=>setLogo(logoBB)} onMouseLeave={()=>logoChanger()} onClick={()=>setLocation('/home')}><img id='logo-img' src={logo}/></div>
                        <button className="UserNav-home-button" onClick={clickHome} style={location === '/home' ? {backgroundColor: '#111111'} : {backgroundColor: '#333333'}}>Home</button>
                        <button className="UserNav-stream-button" onClick={clickStream} style={location === '/stream' ? {backgroundColor: '#111111'} : {backgroundColor: '#333333'}}>Stream</button>
                    </div>
                    {location === '/stream' && (<SearchBar searched={searched} setSearched={setSearched} />)}
                <div className="UserNav-top-navbar-right">
                    <div className="UserNav-upload" onClick={clickUpload} style={location === '/upload' ? {backgroundColor: '#111111'} : {backgroundColor: '#333333'}}>Upload</div>
                    <div className="UserNav-user">{user?.username.length < 14 ? user?.username : `${user?.username.slice(0,15)}...`}</div>
                    <div className="UserNav-dots" style={dots ? {backgroundColor: '#111111'} : {backgroundColor: '#333333'}} onClick={clickDots}>
                        <i className="fas fa-ellipsis"/>
                    {dots && (
                        <div className="dots-menu-container">
                            <div className="logout-button" onClick={logout}>Sign Out</div>
                        </div>
                    )}
                        </div>
                    </div>
                </div>
            </div>



            <div className="UserNav-bottom-navbar">
                <AudioPlayer setLocation={setLocation}/>
            </div>
        </div>
        </>
    );
};


export default UserNav;
