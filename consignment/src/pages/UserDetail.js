import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/UserDetail.css";
import Cookies from "js-cookie";
import axios from "axios";

function UserDetail() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        username: "",
        email: "",
        telephone: "",
        address: "",
        dob: "",
        profileImage: "",
    });


    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [resetToken, setResetToken] = useState("");

    const handleRequestOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/otp/generate-otp", { email });
            alert("OTP sent to your email!");
            setOtpSent(true); // Allow user to proceed to OTP verification step
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/otp/verify-otp", {
                email,
                otp,
            });

            setResetToken(response.data.resetToken); // Save reset token
            alert("OTP verified successfully! You can now reset your password.");
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Invalid OTP or OTP expired. Please try again.");
        }
    };


    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match!");
            return;
        }
    
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/otp/reset-password",
                { newPassword,resetToken},
                {
                    headers: {
                        Authorization: `Bearer ${resetToken}`, // Use the reset token here
                    },
                }
            );
    
            if (response.status === 200) {
                alert("Password updated successfully!");
                setNewPassword("");
                setConfirmPassword("");
                setPasswordError("");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            setPasswordError("Failed to reset password. Please try again.");
        }
    };
    
    useEffect(() => {
        if (isChangingPassword) {
            document.body.classList.add("modal-active");
        } else {
            document.body.classList.remove("modal-active");
        }
    }, [isChangingPassword]);
    

    const handleEditProfile = (e) => {
        const { name, value } = e.target;

        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value, // Update the corresponding key in profile
        }));
    };

    const handleLogOutButton = () => {
        Cookies.remove("token");
        navigate("/");
    };

    useEffect(() => {
        const token = Cookies.get("token");
        console.log("Token for user page:", token);

        axios
            .get("http://localhost:5000/api/v1/users/getSingleUser", {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const userData = response.data;
                const formattedDate = new Date(userData.birthdate).toLocaleDateString("en-CA");

                // Set the profile state with user data
                setProfile({
                    name: userData.fullname,
                    username: userData.username,
                    email: userData.email,
                    telephone: userData.phone_number,
                    address: userData.fulladdress,
                    dob: formattedDate,
                    profileImage: userData.profile_image_url,
                });
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []); // Removed `profile` from dependency array

    const handleSaveButton = async (e) => {
        e.preventDefault();
        const token = Cookies.get("token");

        try {
            const data = new FormData();
            data.append("fullname", profile.name);
            data.append("username", profile.username);
            data.append("email", profile.email);
            data.append("phone_number", profile.telephone);
            data.append("fulladdress", profile.address);
            data.append("birthdate", profile.dob);

            const response = await axios.put(
                "http://localhost:5000/api/v1/users/updateUser",
                data,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setIsEditingProfile(false);
                setIsEditingPersonal(false);
                alert("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error during save:", error.message);
        }
    };

    return (
        <div className="container">
            <div className="backlogin" onClick={() => navigate(-1)}>
                Back
            </div>
            <div className="container2">
                <h1 className="title">Account Settings</h1>
                <div className="big-box">
                    <h2 className="section-title">My Profile</h2>
                    <div className="profile-card">
                        <div className="profile-content">
                            <img src={profile.profileImage} alt="Profile" className="profile-image" />
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
                                        <button className="save-button" onClick={handleSaveButton}>
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <h3>{profile.name}</h3>
                                )}
                            </div>
                        </div>
                        <button
                            className="edit-button"
                            onClick={() => setIsEditingProfile(!isEditingProfile)}
                        >
                            Edit
                        </button>
                    </div>
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
                                <button className="save-button" onClick={handleSaveButton}>
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
                                <div className="pass-logout-container">
                                    <button className="changePasswordButton" onClick={() => setIsChangingPassword(true)}>Change Password</button>
                                    <button className="logOutButton" onClick={handleLogOutButton}>Log Out</button>
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
                {isChangingPassword && (
                    <div className="password-modal">
                        <h3>Change Password</h3>

                        {!otpSent ? (
                            // Request OTP
                            <>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button onClick={handleRequestOtp}>Send OTP</button>
                            </>
                        ) : !resetToken ? (
                            // Verify OTP
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button onClick={handleVerifyOtp}>Verify OTP</button>
                            </>
                        ) : (
                            // Reset Password
                            <>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {passwordError && <p className="error-message">{passwordError}</p>}
                                <button onClick={handleResetPassword}>Submit</button>
                            </>
                        )}
                        <button onClick={() => setIsChangingPassword(false)}>Cancel</button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default UserDetail;
