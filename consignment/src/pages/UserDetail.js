import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './UserDetail.css'
import Cookies from 'js-cookie';
import axios from 'axios';

function UserDetail() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        username: "",
        email: "",
        telephone: "",
        address: "",
        dob: "",
        password: "",
        profileImage:"",
    });

    const [user,setUser] = useState(null);
  
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);

    const handleEditProfile = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };
    

    useEffect(()=> {
        const token = Cookies.get('token');
        console.log("ini token untuk userpage:",token);
  
        axios.get('http://localhost:5000/api/v1/users/getSingleUser',{
          withCredentials:true, 
          headers:{
              'Authorization': `Bearer ${token}`,
          },
            
        })
        .then((response)=>{
            const userData = response.data
            console.log("User data received:", userData);
            const formattedDate = new Date(userData.birthdate).toLocaleDateString('en-CA');

            // Set the profile state with user data
            setProfile({
                ...profile,
                name: userData.fullname,
                username: userData.username,
                email: userData.email,
                telephone: userData.phone_number, // Make sure it's set correctly
                address: userData.fulladdress,
                dob: formattedDate,
                password: userData.password,  // Add more fields as needed
                profileImage: userData.profile_image_url,
          })
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
  
    },[]);

    const handleSaveButton = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
        
        // Log the profile state to verify if changes are there
        console.log("Saving profile data: ", profile);
    
        try {
            const data = new FormData();
    
            // Ensure all fields are included in the request
            data.append("fullname", profile.name);
            data.append("username", profile.username);
            data.append("email", profile.email);
            data.append("phone_number", profile.telephone);
            data.append("fulladdress", profile.address);
            data.append("birthdate", profile.dob);
    
            // Only append password if it has been changed
            if (profile.password && profile.password !== user.password) {
                data.append("password", profile.password);
            }
    
            console.log("Form data to be sent: ", data); // Log the data being sent
    
            const response = await axios.put("http://localhost:5000/api/v1/users/updateUser", data, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            // Log the response to see if the backend returned updated data
            console.log("Response from backend: ", response.data);
    
            if (response.status === 200) {
                setIsEditingProfile(false);
                setIsEditingPersonal(false);
    
                // After successful update, update the profile state with the new data
                const updatedUserData = response.data;
                const formattedDate = new Date(updatedUserData.birthdate).toLocaleDateString('en-CA');
    
                setProfile({
                    ...profile,
                    name: updatedUserData.fullname,
                    username: updatedUserData.username,
                    email: updatedUserData.email,
                    telephone: updatedUserData.phone_number,
                    address: updatedUserData.fulladdress,
                    dob: formattedDate,
                    password: updatedUserData.password,
                    profileImage: updatedUserData.profile_image_url,
                });
    
            } else {
                console.error("Error: Request failed with status", response.status);
            }
        } catch (error) {
            console.error("Error during save:", error.message);
        }
    };    


    return (
        <div className="container">
        {/* Back Button */}
        <button className="back-button" onClick={() =>{navigate("/")}}>Back</button>

        {/* Title */}
        <h1 className="title">Account Settings</h1>

        {/* Big Box */}
        <div className="big-box">
            {/* My Profile Section */}
            <h2 className="section-title">My Profile</h2>
            <div className="profile-card">
            <div className="profile-content">
                {/* Profile Picture */}
                <img
                src={profile.profileImage}
                alt="Profile"
                className="profile-image"
                />

                {/* Profile Details */}
                <div className="profile-text">
                {isEditingProfile ? (
                    <div className="profile-edit">
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleEditProfile}
                        className="input-field"
                    />
                    <button
                        className="save-button"
                        onClick={handleSaveButton}
                    >
                        Save
                    </button>
                    </div>
                ) : (
                    <h3>{profile.name}</h3>
                )}
                </div>
            </div>

            {/* Edit Button */}
            <button
                className="edit-button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
            >
                Edit
            </button>
            </div>

            {/* Personal Information Section */}
            <div className="profile-cardd">
            <h2 className="section-title">Personal Information</h2>

            {isEditingPersonal ? (
                <div className="personal-edit">
                <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleEditProfile}
                    className="input-field"
                    placeholder="Username"
                />
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleEditProfile}
                    className="input-field"
                    placeholder="Email"
                />
                <input
                    type="text"
                    name="telephone"
                    value={profile.telephone}
                    onChange={handleEditProfile}
                    className="input-field"
                    placeholder="Telephone"
                />
                <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleEditProfile}
                    className="input-field"
                    placeholder="Full Address"
                />
                <input
                    type="text"
                    name="dob"
                    value={profile.dob}
                    onChange={handleEditProfile}
                    className="input-field"
                    placeholder="Date of Birth"
                />
                <input
                    type="text"
                    name="password"
                    value={profile.password}
                    onChange={handleEditProfile}
                    className="input-field"
                    placeholder="Password"
                />
                <button
                    className="save-button"
                    onClick={handleSaveButton}
                >
                    Save
                </button>
                </div>
            ) : (
                <div className="personal-content">
                <div>
                    <b>Username:</b>
                    <span>{profile.username}</span>
                </div>
                <div>
                    <b>Telephone:</b>
                    <span>{profile.telephone}</span>
                </div>
                <div>
                    <b>Email:</b>
                    <span>{profile.email}</span>
                </div>
                <div>
                    <b>Full Address:</b>
                    <span>{profile.address}</span>
                </div>
                <div>
                    <b>Date of Birth:</b>
                    <span>{profile.dob}</span>
                </div>
                <div>
                    <b>Password:</b>
                    <span>{profile.password}</span>
                </div>
                </div>
            )}
            <button
                className="edit-buttonn"
                onClick={() => setIsEditingPersonal(!isEditingPersonal)}
            >
                Edit
            </button>
            </div>
        </div>
        </div>
    );
    }

    export default UserDetail;