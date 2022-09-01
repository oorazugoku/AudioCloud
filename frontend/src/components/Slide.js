import React, { useEffect, useState } from "react"
import './CSS/HomePage.css'

const Slide = () => {
    const [swap, setSwap] = useState(false)
    const [slide, setSlide] = useState(<img src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_a-3bb2d420.jpg' className='HomePage-slide1'/>)




    useEffect(()=>{
        setTimeout(() => {
            setSwap(!swap)
        }, 5000);
        if (swap) setSlide(<div className='HomePage-slide1'/>)
        if (!swap) setSlide(<div className='HomePage-slide2'/>)
    }, [swap])


    return (
        <div className='Slide-container'>
            {slide}
        </div>
    )
}

export default Slide
