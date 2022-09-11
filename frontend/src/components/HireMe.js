import React, { useState } from "react";
import suit_pic from './images/suit_pic.png'

import './CSS/HireMe.css'

const HireMe = () => {
    const [meet, setMeet] = useState(false)

    const handleInfoClick = () => {
    }

    return (
    <>
        <div className="HireMe-container">
            <div className='meet-text' onClick={()=>setMeet(!meet)}>Meet the Developer</div>
            {meet && (<a href='https://www.linkedin.com/in/benjamin-durham-full-stack/' target='_blank'>
                <div className="HireMe-personal-info-container">
                    <div className="HireMe-image-div">
                        <img className="me-pic" src={suit_pic}/>
                    </div>
                    <div className="personal-info">
                        <div className="my-name">Ben Durham</div>
                        <div className="my-location"><i class="fas fa-location-dot"/>Austin, Tx</div>
                        <div className="my-title">Full Stack Engineer</div>
                    </div>
                </div>
                <div className="my-bio">At 11 years old, I loved playing around with web design, learning basic HTML and making simple themed websites on kid subjects like Dragonball Z.
                Since then, I have developed my skills and have grown to dig deep into my passion.
                JavaScript, React, and React-Redux are my strongest skillsets but I strive to learn as much as I can and become proficient with many tools.</div>
            </a>)}
        </div>
    </>
    );
};

export default HireMe;
