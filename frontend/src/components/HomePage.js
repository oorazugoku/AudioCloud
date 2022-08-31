import './CSS/HomePage.css'
import logoBB from './images/cloud-BB.png'
import logoPB from './images/cloud-PB.png'
import logoPO2 from './images/cloud-PO2.png'
import logoWhite from './images/cloud-white.png'
import logoYO from './images/cloud-YO.png'


const HomePage = () => {
    return (
        <div className='HomePage-Container'>
            <div className='HomePage-NavBar'>
            <div className='HomePage-navbar-right'><img className='HomePage-logo' src={logoBB}/>Audiocloud</div>
                <div className='HomePage-navbar-right'></div>
            </div>
        </div>
    )
}

export default HomePage
