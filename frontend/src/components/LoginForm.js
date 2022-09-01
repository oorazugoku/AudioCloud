import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import logo from './images/cloud-YO.png'
import logo2 from './images/cloud-PO2.png'

import './CSS/LoginForm.css'
import { login } from "../store/session";



const LoginForm = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logoColor, setLogoColor] = useState(logo2)

    const onLogin = (e) => {
        e.preventDefault();

        const info = {
            credential: email,
            password
        }
        dispatch(login(info))
        .then(()=>setShowModal(false))
        .catch(async (res) => {
          const data = await res.json();
          console.log(data.errors)
          if (data && data.errors) setErrors(data.errors);
        });

    }

    return (
        <div className='LoginForm-Container'>
        <i className="fas fa-x" onClick={()=>setShowModal(false)}/>
        <div className='login-errors'>
            {errors.map((error, i) => (
              <ul className='login-errors-inner' key={i}>{error}</ul>
            ))}
          </div>
        {/* <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <div className='form-button-outer'>
            <button className='form-button-demo' onMouseEnter={()=>setLogoColor(logo)} onMouseLeave={()=>setLogoColor(logo2)} type='submit' onClick={() => { setEmail("demo@aa.io"); setPassword("password") }}><img src={logoColor} style={{height: '15px'}}/>    Demo User</button>
        </div>
        <div className="login-or-container">
            <div className="or-bar"/><div className="login-or">or</div><div className="or-bar"/>
        </div>
        <form className='login-form' onSubmit={onLogin}>
          <div className='form-section'>
            <input
              name='credential'
              className='form-input'
              placeholder='Enter your Email or Username'
              type='text'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              // required
            />
          </div>
          <div className='form-section'>
            <input
              name='password'
              className='form-input'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              // required
            />
          </div>
          <div className='form-button-outer'>
            <button className='form-button-login' type='submit'>Log In</button>
          </div>
        </form>
        </div>
    )
}

export default LoginForm