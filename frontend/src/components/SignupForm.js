import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { signup } from "../store/session";

import './CSS/SignupForm.css'



const SignupForm = ({ setShowSignupModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password2, setPassword2] = useState('');


    const onSignup = async (e) => {
        e.preventDefault();
        if (password2 !== password) {
            setErrors(['Your Passwords MUST match.'])
            return
        }

        const info = {
            firstName,
            lastName,
            email,
            username: username.trim(),
            password
        }

        await dispatch(signup(info))
        .then(()=>setShowSignupModal(false))
        .then(()=>history.push('/userNav'))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    return (
        <div className='LoginForm-Container'>
        <i className="fas fa-x" onClick={()=>setShowSignupModal(false)}/>
        <div className='login-errors'>
            {errors.map((error, i) => (
              <div className='login-errors-inner' key={i}>{error}</div>
            ))}
          </div>
        <form className='login-form' onSubmit={onSignup}>
          <div className='form-section'>
          <label>First Name</label>
            <input
              name='firstName'
              className='form-input-signup'
              placeholder='First Name'
              type='text'
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              required
            />
          </div>
          <div className='form-section'>
          <label>Last Name</label>
            <input
              name='lastName'
              className='form-input-signup'
              placeholder='Last Name'
              type='text'
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              required
            />
          </div>
          <div className='form-section'>
          <label>Username</label>
            <input
              name='username'
              className='form-input-signup'
              placeholder='Enter a Username'
              type='text'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />
          </div>
          <div className='form-section'>
            <label>Email</label>
            <input
              name='email'
              className='form-input-signup'
              placeholder='Enter your Email'
              type='text'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-section'>
          <label>Password</label>
            <input
              name='password'
              className='form-input-signup'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <div className='form-section'>
          <label>Verify Password</label>
            <input
              name='password'
              className='form-input-signup'
              placeholder='Password'
              type='password'
              value={password2}
              onChange={(e)=>setPassword2(e.target.value)}
              required
            />
          </div>
          <div className='form-button-outer'>
            <button className='form-button-login' type='submit'>Sign Up</button>
          </div>
        </form>
        </div>
    )
}

export default SignupForm
