import React, { useState } from 'react'
import { Modal } from './context/Modal'
import Slide from './Slide'
import LoginForm from './LoginForm'

import logoBB from './images/cloud-BB.png'
import logoPB from './images/cloud-PB.png'
import logoPO2 from './images/cloud-PO2.png'
import logoWhite from './images/cloud-white.png'
import logoYO from './images/cloud-YO.png'

import './CSS/HomePage.css'


const HomePage = () => {
    const [showModal, setShowModal] = useState(false)

    const handleSignIn = (e) => {
        e.preventDefault()
    }

    return (
        <>
        <div className='HomePage-Container'>
            <div className='HomePage-NavBar'>
            <div className='HomePage-navbar-left'><img className='HomePage-logo' src={logoWhite}/>Audiocloud</div>
                <div className='HomePage-navbar-right'>
                    <button className='login-button' onClick={()=>setShowModal(true)}>Sign In</button>
                    <button className='signup-button'>Create Account</button>
                </div>
            </div>
            <div className='HomePage-header-images'>
                <Slide/>
            </div>
            <div className='HomePage-body'>
                <div className='HomePage-body-text'>
                    Hear what's trending for free in the AudioCloud community
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
        </>
    )
}

export default HomePage
