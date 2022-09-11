import React, { useEffect, useState } from 'react'
import { Modal } from './context/Modal'
import Slide from './Slide'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import logoWhite from './images/Audiocloud-white.svg'


import './CSS/HomePage.css'
import { useSelector } from 'react-redux'


const HomePage = () => {
    const [showModal, setShowModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)
    // const user = useSelector(state => state.session.user)

    // useEffect(()=>{
    //     if (user) setIsLoaded(true)
    // }, [])

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
                    Hear what's trending for free in the AudioCloud community
                </div>
            </div>
            <div className='HomePage-section2'>
                <div className='HomePage-section2-text'>
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
