import "../style/login.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();

  // State untuk form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State untuk visibilitas password
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Fungsi untuk menangani perubahan pada input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk toggle visibilitas password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Fungsi untuk mengirimkan data login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const login_data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/users/loginUser',
        login_data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const userData = response.data.data;
        Cookies.set('token', userData.token, { expires: 3, secure: true, sameSite: 'strict' });
        navigate("/");
      } else {
        console.log("Error submitting data");
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="pagelogin">
        <div className="pagelogin2">
            <div className="backlogin" onClick={() => navigate(-1)}>
            Back
            </div>
            <div className="formlogin">
            <div className="tulisanlogin">Log In</div>
            <form onSubmit={handleSubmit}>
                <div className="username">
                <div className="icon">
                    <i className="fas fa-user"></i> {/* Profile Icon */}
                </div>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    placeholder="Username"
                />
                </div>
                <div className="email">
                <div className="icon">
                    <i className="fas fa-envelope"></i> {/* Envelope Icon */}
                </div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="Email"
                />
                </div>
                <div className="password">
                <div className="icon">
                    <i className="fas fa-lock"></i> {/* Lock Icon */}
                </div>
                <input
                    type={passwordVisible ? 'text' : 'password'} // Mengubah tipe input berdasarkan passwordVisible
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="Password"
                />
                <div className="eye-icon" onClick={togglePasswordVisibility}>
                    <i className={passwordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'}></i> {/* Ikon berubah */}
                </div>
                </div>
                <div className="forgotpassword">
                <a href="/forgot-password">Forgot Password?</a>
                </div>
                <div className="getstarted">
                <button type="submit">Get Started</button>
                </div>
                <div className="signin">
                <a href="/signin">
                    Don’t have an account? <span>sign up</span>
                </a>
                </div>
            </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
