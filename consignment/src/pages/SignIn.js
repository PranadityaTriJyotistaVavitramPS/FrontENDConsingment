import React, { useState } from "react";
import axios from "axios";
import "../style/SignIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [foto, setFoto] = useState(null); // State untuk menyimpan gambar yang diupload

  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:"",
    fullname:"",
    phone_number:"",
    fulladdress:"",
    birthdate:{
        day:"",
        month:"",
        year:"",
    },
    profileImageUrl:null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file selected
    if (file) {
      setFoto(URL.createObjectURL(file));  // Set the file preview
      setFormData({
        ...formData,                      // Preserve existing form data
        profileImageUrl: file,            // Set the uploaded file as profile image
      });
    }
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const data = new FormData();
        data.append("username",formData.username);
        data.append("password",formData.password);
        data.append("email",formData.email);
        data.append("fullname",formData.fullname);
        data.append("phone_number",formData.phone_number);
        data.append("fulladdress",formData.fulladdress);
        data.append("birthdate",`${formData.birthdate.year}-${formData.birthdate.month}-${formData.birthdate.day}`);

        if(formData.profileImageUrl){
            data.append("profileImageUrl", formData.profileImageUrl);
        }

        const response = await axios.post("http://localhost:5000/api/v1/users/createUser", data);
        console.log("API Response:", response);

        if (response.status === 201) {
          // Slight delay before navigation to ensure the page state updates first
          setTimeout(() => {
            navigate('/login'); 
          }, 500); // Adjust time as needed
        } else {
          console.error("Error: Request failed with status", response.status);
        }
  
    } catch (error) {
        console.error("Error Signing Up call me", error)
    }
 };

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
  };

  const handleChangeB = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      birthdate: {
        ...formData.birthdate,  // Keep the previous birthdate values
        [name]: value,           // Update the specific part of the birthdate
      },
    });
  };
  

  return (
    <div className="allsignin">
      <div className="allsignin2">
        <div className="backsignin" onClick={() => navigate(-1)}>
          Back
        </div>
        <div className="formsignin">
            <div className="scrollkeatas">
                <div className="tulisansignin">Sign Up</div>
                <div className="fotoprofil">
                    <label htmlFor="upload-foto" className="foto-upload-label">
                    <div
                        className="foto-container"
                        style={{
                        backgroundImage: foto ? `url(${foto})` : 'none',
                        }}
                    >
                        {!foto && (
                        <div className="upload-text">
                            Upload Picture
                        </div>
                        )}
                    </div>
                    </label>
                    <input
                    type="file"
                    id="upload-foto"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    />
                </div>
                
                <form id="signinform" onSubmit={handleSubmit}>
                    <div className="usernamesignin">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                    </div>
                    <div className="emailsignin">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                    </div>
                    <div className="passwordsignin">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </div>
                    <div className="input-field1">
                        <input
                            type="fullName"
                            id="fullName"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Full Name"
                        />
                    </div>
                    <div className="input-field2">
                        <input
                            type="text"
                            id="telephone"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="Telephone Number"
                        />
                    </div>
                    <div className="input-field3">
                        <input
                            id="address"
                            name="fulladdress"
                            value={formData.fulladdress}
                            onChange={handleChange}
                            placeholder="Full Address"
                        />
                    </div>
                    <div className="datebirthsignin">
                        What is your date of birth?
                    </div>
                    <div className="birthdate-section">
                        <div className="date-picker">
                            <select id="day" name="day" className="custom-select" value={formData.birthdate.day} onChange={handleChangeB}>
                                <option value="">DD</option>
                                {[...Array(31).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <select id="month" name="month" className="custom-select" value={formData.birthdate.month} onChange={handleChangeB}>
                                <option value="">BB</option>
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                                    <option key={index} value={index + 1}>{month}</option>
                                ))}
                            </select>
                            <select id="year" name="year" className="custom-select" value={formData.birthdate.year} onChange={handleChangeB}>
                                <option value="">TTTT</option>
                                {[...Array(100).keys()].map(i => {
                                    const year = new Date().getFullYear() - i;
                                    return (
                                        <option key={year} value={year}>{year}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="getstarted">
                        <button type="submit">Get Started</button>
                    </div>
                    <div className="alreadysignin">
                        <a href="/login">
                            Already have an account? <span>log in</span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
