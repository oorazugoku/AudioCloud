import React, { useEffect, useState } from 'react'
import { Modal } from './context/Modal'
import Slide from './Slide'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import logoWhite from './images/Audiocloud-white.svg'
import linked from './images/Linkedin.png'
import git from './images/github.png'


import './CSS/HomePage.css'


const HomePage = () => {

    const [showModal, setShowModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    return (
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
                    Sign up now and become an Artist in seconds!
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
