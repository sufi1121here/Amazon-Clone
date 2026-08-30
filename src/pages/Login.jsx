import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFirebaseError = (error) => {
    // Map common Firebase errors to clean, professional warning messages
    switch (error.code) {
      case 'auth/invalid-email':
        setErrorMessage('The email address is badly formatted.');
        break;
      case 'auth/user-disabled':
        setErrorMessage('This user account has been disabled.');
        break;
      case 'auth/user-not-found':
        setErrorMessage('We cannot find an account with that e-mail address.');
        break;
      case 'auth/wrong-password':
        setErrorMessage('Incorrect password. Please try again.');
        break;
      case 'auth/email-already-in-use':
        setErrorMessage('An account with this email address already exists.');
        break;
      case 'auth/weak-password':
        setErrorMessage('Password should be at least 6 characters.');
        break;
      case 'auth/invalid-credential':
        setErrorMessage('Cannot find an account with that e-mail, or the password entered is incorrect.');
        break;
      case 'auth/configuration-not-found':
        setErrorMessage('Authentication provider is not configured. Make sure Email/Password is enabled in the Firebase Console.');
        break;
      default:
        setErrorMessage(error.message);
    }
  };

  const handleLinkClick = (e, topic) => {
    e.preventDefault();
    if (topic === 'conditions') {
      alert("Conditions of Use:\n\nThis Amazon Clone is a portfolio project built for educational and demonstration purposes. It is not affiliated with, authorized, or endorsed by Amazon.com in any way.");
    } else if (topic === 'privacy') {
      alert("Privacy Notice:\n\nYour login details are sent securely and directly to your own Firebase Authentication service. This application does not store, track, or share any personal information.");
    } else if (topic === 'help') {
      alert("Need Help?\n\nIf you forgot your password, since this is an educational clone, simply register a new account with a different email, or log into your Firebase Console to reset it!");
    }
  };

  const signIn = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        handleFirebaseError(error);
      });
  };

  const register = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        handleFirebaseError(error);
      });
  };

  return (
    <div className="login-page">
      <Link to="/">
        <img
          className="login-page-logo"
          src="/images/amz.png"
          alt="Amazon Logo"
        />
      </Link>

      {errorMessage && (
        <div className="login-error-alert">
          <div className="login-error-alert-content">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <div className="login-error-alert-text">
              <h4>There was a problem</h4>
              <p>{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="login-page-container">
        <h1>Sign-In</h1>

        <form>
          <h5>E-mail or mobile phone number</h5>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />

          <h5>Password</h5>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="At least 6 characters"
          />

          <button type="submit" onClick={signIn} className="login-page-signInButton">
            Sign In
          </button>
        </form>

        <p className="login-agreement">
          By continuing, you agree to Amazon's Clone <a href="#" onClick={(e) => handleLinkClick(e, 'conditions')}>Conditions of Use</a> and <a href="#" onClick={(e) => handleLinkClick(e, 'privacy')}>Privacy Notice</a>.
        </p>

        <div className="login-help">
          <a href="#" onClick={(e) => handleLinkClick(e, 'help')}>Need help?</a>
        </div>
      </div>

      <div className="login-divider">
        <h5>New to Amazon?</h5>
      </div>

      <button onClick={register} className="login-page-registerButton">
        Create your Amazon Account
      </button>

      <footer className="login-page-footer">
        <div className="login-page-footer-links">
          <a href="#" onClick={(e) => handleLinkClick(e, 'conditions')}>Conditions of Use</a>
          <a href="#" onClick={(e) => handleLinkClick(e, 'privacy')}>Privacy Notice</a>
          <a href="#" onClick={(e) => handleLinkClick(e, 'help')}>Help</a>
        </div>
        <p className="login-page-footer-copyright">
          © 1996-2026, Amazon.com, Inc. or its affiliates
        </p>
      </footer>
    </div>
  );
}

export default Login;
