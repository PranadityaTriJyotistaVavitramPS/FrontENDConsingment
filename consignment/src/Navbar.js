import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Cookies from 'js-cookie'
import axios from 'axios'

function BoxContainer() {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate(); // Moved useNavigate here inside the component
  const [user,setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const handleSellButton = () =>{
    navigate('/sellselection')
  }

  useEffect(()=> {
      const token = Cookies.get('token');

      axios.get('http://localhost:5000/api/v1/users/getSingleUser',{
        withCredentials:true, 
        headers:{
            'Authorization': `Bearer ${token}`,
        },
          
      })
      .then((response)=>{
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

  },[]);

  // Fungsi untuk mengatur tombol yang aktif dan scroll ke section
  const handleClick = (buttonName) => {
    setActiveButton(buttonName);

    // Scroll ke section berdasarkan tombol yang ditekan
    if (buttonName === 'home') {
      document.getElementById('discoverSection').scrollIntoView({ behavior: 'smooth' }); // Scroll ke discoverSection
    }
    if (buttonName === 'aboutnavbar') {
      document.getElementById('aboutSection').scrollIntoView({ behavior: 'smooth' }); // Scroll ke aboutSection
    }
    if (buttonName === 'find') {
      navigate('/find'); // Now works correctly inside the component
    }
  };

  return (
    <div className="outer-box">
      <div className="logo">
        (<img src="/img/logohimatekkom.png" alt="Logo HIMATEKKOM" />)
      </div>
      <div className="merek">
        HIMATEKKOM Consignment
      </div>
      <div className="navbar">
        <div
          className={`home ${activeButton === 'home' ? 'kuning' : 'putih'}`}
          onClick={() => handleClick('home')}
        >
          Home
        </div>
        <div
          className={`find ${activeButton === 'find' ? 'kuning' : 'putih'}`}
          onClick={() => handleClick('find')}
        >
          Find
        </div>
        <div
          className={`aboutnavbar ${activeButton === 'aboutnavbar' ? 'kuning' : 'putih'}`}
          onClick={() => handleClick('aboutnavbar')}
        >
          About
        </div>
      </div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input" 
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>
      <div className="sellproductorservice" onClick={handleSellButton}>
        <span className="material-symbols-outlined custom-icon">add_circle</span>
        Sell Product or Service
      </div>
      <div className="profile-picture" onClick={() => {navigate('/userpage')}}>
        {user && user.profile_image_url ? (<img className='profile-picture' src={user.profile_image_url}alt="profilepicture" />):(<img className='profile-picture' src="/img/logohimatekkom.png" alt="profilepicture" />)}
      </div>
    </div>
  );
}

export default BoxContainer;
