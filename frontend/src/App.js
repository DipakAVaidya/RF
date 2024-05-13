import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { IonIcon } from '@ionic/react';
import { close, mail, lockClosed, person } from 'ionicons/icons';


function App() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '', // for registration form
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/users/register`, formData);
      if (response.status === 201) {
        // Registration successful
        console.log(response.data.message);
        // Clear the form data or perform any other necessary actions
        setFormData({
          email: '',
          password: '',
          username: '',
        });
      } else {
        // Handle error response
        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error.response.data.error);
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const togglePopup = () => {
    setIsPopupActive(!isPopupActive);
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); // User data from the server
    } catch (error) {
      console.error('Error:', error.response.data.error);
    }
  };

  return (
    <div className="App">
      <header>
        <h2 className="logo">Logo</h2>
        <nav className="navigation">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
          <button className="btnLogin-popup" onClick={togglePopup}>
            Login
          </button>
        </nav>
      </header>
      <div className={`wrapper ${isPopupActive ? 'active-popup' : ''} ${!isLoginForm ? 'active' : ''}`}>
        <span className="icon-close" onClick={togglePopup}>
        <IonIcon icon={close} />
        </span>
        {isLoginForm ? (
          <div className="form-box login">
            <h2>Login</h2>
            <form>
              <div className="input-box">
                <span className="icon">
                <IonIcon icon={mail} />
                </span>
                <input type="email" required />
                <label htmlFor="">Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                <IonIcon icon={lockClosed} />
                </span>
                <input type="password" required autoComplete="current-password" />
                <label htmlFor="">Password</label>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#">Forgot Password</a>
              </div>
              <button type="submit" className="submit-btn">
                Login
              </button>
              <div className="login-register">
                <p>
                  Don't have an account?{' '}
                  <a href="#" onClick={toggleForm}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="form-box register">
            <h2>Registration</h2>
            <form>
              <div className="input-box">
                <span className="icon">
                <IonIcon icon={person} />
                </span>
                <input type="text" required />
                <label htmlFor="">Username</label>
              </div>
              <div className="input-box">
                <span className="icon">
                <IonIcon icon={mail} />
                </span>
                <input type="email" required />
                <label htmlFor="">Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <IonIcon icon={lockClosed} /> 
                </span>
                <input type="password" required />
                <label htmlFor="">Password</label>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> I agree to terms & conditions
                </label>
              </div>
              <button type="submit" className="submit-btn">
                Register
              </button>
              <div className="login-register">
                <p>
                  Already have an account?{' '}
                  <a href="#" onClick={toggleForm}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;