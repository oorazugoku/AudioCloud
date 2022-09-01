import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { login } from "../store/session";
import logo from './images/cloud-YO.png'
import logo2 from './images/cloud-PO2.png'

import './CSS/LoginForm.css'
import { useHistory } from "react-router-dom";



const LoginForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        .then(()=>history.push('/userNav'))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    const onDemo = () => {
      const info = {
          credential: 'demo@email.com',
          password: 'password'
      }
      dispatch(login(info))
      .then(()=>setShowModal(false))
      .then(()=>history.push('/userNav'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

    return (
        <div className='LoginForm-Container'>
        <i className="fas fa-x" onClick={()=>setShowModal(false)}/>
        <div className='login-errors'>
            {errors.map((error, i) => (
              <div className='login-errors-inner' key={i}>{error}</div>
            ))}
          </div>
        <div className='form-button-outer'>
            <button className='form-button-demo' onMouseEnter={()=>setLogoColor(logo)} onMouseLeave={()=>setLogoColor(logo2)} type='submit' onClick={() => { onDemo() }}><img src={logoColor} style={{height: '15px'}}/>    Demo User</button>
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
