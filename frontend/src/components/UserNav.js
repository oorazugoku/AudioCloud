import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import * as sessionActions from '../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logoBB from './images/cloud-BB.png';
import logoPB from './images/cloud-PB.png';
import logoPO2 from './images/cloud-PO2.png';
import logoWhite from './images/cloud-white.png';
import logoYO from './images/cloud-YO.png';


import './CSS/UserNav.css';
import UserPage from "./UserPage";
import Upload from "./Upload";
import { getSongs } from "../store/songs";
import Stream from "./Stream";
import CommentsPage from "./CommentsPage";
import { setPlaying } from "../store/playing";
import { getUsers } from "../store/users";
import { removeSong } from "../store/song";
import { getAllLikes } from "../store/likes";
import SearchBar from "./SearchBar";


const UserNav = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [file, setFile] = useState('');
    const [location, setLocation] = useState('home');
    const [logo, setLogo] = useState(null);
    const [dots, setDots] = useState(false);
    const user = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
      if (user) setIsLoaded(true)
    }, [dispatch, user])

    useEffect(()=>{
        dispatch(getSongs())
        dispatch(getUsers())
        dispatch(getAllLikes())
    }, [])

    useEffect(()=>{
        logoChanger();
    }, [location]);

    const clickHome = () => {
        setLocation('home');
        setDots(false);
    };

    const clickStream = () => {
        setLocation('stream');
        setDots(false);
    };

    const clickUpload = () => {
        setLocation('upload');
        setDots(false);
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
        if (location === 'home') setLogo(logoBB);
        if (location === 'stream') setLogo(logoPO2);
        if (location === 'upload') setLogo(logoYO);
        if (location === 'comments') setLogo(logoPB);
    };


    return isLoaded && (
        <>
        <div className="UserNav-Container">
            <div className="UserNav-top-navbar-container">
                <div className="UserNav-top-navbar">
                    <div className="UserNav-top-navbar-left">
                        <div className='UserNav-logo' onMouseEnter={()=>setLogo(logoBB)} onMouseLeave={()=>logoChanger()} onClick={()=>setLocation('home')}><img src={logo}/></div>
                        <button className="UserNav-home-button" onClick={clickHome} style={location === 'home' ? {backgroundColor: '#111111'} : {backgroundColor: '#333333'}}>Home</button>
                        <button className="UserNav-stream-button" onClick={clickStream} style={location === 'stream' ? {backgroundColor: '#111111'} : {backgroundColor: '#333333'}}>Stream</button>
                    </div>
                    {location === 'stream' && (<SearchBar />)}
                <div className="UserNav-top-navbar-right">
                    <div className="UserNav-upload" onClick={clickUpload} style={location === 'upload' ? {backgroundColor: '#111111'} : {backgroundColor: '#333333'}}>Upload</div>
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



            {location === 'home' && (<UserPage setLocation={setLocation} />)}
            {location === 'stream' && (<Stream setLocation={setLocation} />)}
            {location === 'upload' && (<Upload setLocation={setLocation} />)}
            {location === 'comments' && (<CommentsPage />)}




            <div className="UserNav-bottom-navbar">
                <AudioPlayer />
            </div>
        </div>
        </>
    );
};


export default UserNav;
