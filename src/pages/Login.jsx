import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    // Real Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    // Real Firebase Registration
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="/images/amz.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className="login-container">
        <h1>Sign-In</h1>

        <form>
          <h5>E-mail</h5>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

          <button type="submit" onClick={signIn} className="login-signInButton">Sign In</button>
        </form>

        <p>
          By signing-in you agree to Amazon's Clone Conditions of Use & Sale. Please
          see our Privacy Notice.
        </p>

        <button onClick={register} className="login-registerButton">Create your Amazon Account</button>
      </div>
    </div>
  );
}

export default Login;
