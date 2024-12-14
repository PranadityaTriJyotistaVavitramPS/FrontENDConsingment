import React, { useEffect, useState } from "react";
import "../style/ServerDetail.css";
import { useParams,useNavigate } from 'react-router-dom';
import axios from "axios";

const App = () => {
  const {id_service} = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [service,setService] = useState([]);
  const navigate = useNavigate(); // To handle navigation
  const [loading,setLoading] = useState(true)
  const [images,setImages] = useState([]);
  

  useEffect(()=>{
    const fetchServiceDetail = async() =>{
      try {
        const data = await axios.get(`http://localhost:5000/api/v1/services/${id_service}`);
        const service_response = data.data
        setService(service_response);

        const fetchedImages=[];

        for(let i=1;i<=5;i++){
          const imageKey = `service_foto${i}`;
          if(service_response[imageKey]){
            fetchedImages.push(service_response[imageKey]);
          }
        }
        setImages(fetchedImages);
        console.log(service_response);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };
    fetchServiceDetail();
  },[id_service])

  if(loading){
    <div>Loading...</div>
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container">
      {/* Back Button */}
      <button className="back-button" onClick={() => window.history.back()}>
        Back
      </button>

      {/* Main Content */}
      <div className="content">
        {/* Left Box */}
        <div className="left-box">
          {/* Carousel */}
          <div className="carousel">
            <button className="carousel-button left" onClick={handlePrev}>
              <img src="button2.png" alt="Previous" />
            </button>
            <div className="main-image-container">
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="main-image"
              />
            </div>
            <button className="carousel-button right" onClick={handleNext}>
              <img src="button.png" alt="Next" />
            </button>
          </div>

          {/* Thumbnail */}
          <div className="thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${index === currentIndex ? "active" : ""}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>

          {/* Additional Content */}
          <h1>Greetings!</h1>
          <p>
            We are passionate, hardworking, and professional bunch of people
            working together side by side to provide our clients the absolute
            best. Our products are always CLEAN HIGH-QUALITY RESPONSIVE DESIGN.
          </p>
          <h2>Our Premium Services:</h2>
          <ul>
            <li>100% Clean Responsive Design</li>
            <li>Ecommerce site Design (Standard and Premium Plans Only)</li>
            <li>
              Multiple Payment Methods (PayPal, Stripe, Bank, Credit Card, etc.)
            </li>
            <li>Wholesale site</li>
            <li>Website Revamp</li>
            <li>Blog</li>
            <li>Figma to WordPress</li>
            <li>Elementor / Fix Elementor Issue</li>
            <li>Social media integration</li>
            <li>SEO friendly site</li>
            <li>Speed Optimization</li>
            <li>
              Contact forms, Google analytics & map, blog integration
            </li>
            <li>And many more premium features!</li>
          </ul>
          <p>
            Please contact us with your requirements before placing the order
            to avoid cancellation. If you are clear about your requirement,
            place your order now. :)
          </p>
        </div>

        {/* Right Box */}
        <div className="right-box">
          {/* Profile Section */}
          <div className="profile-header">
            <img src={service.profile_image_url} alt="Profile" className="profile-image" />
            <h2 className="profile-name">{service.seller_name}</h2>
          </div>

          <h2>Our Premium Services:</h2>
          {["Website", "Aplikasi", "IoT"].map((category) => {
            const isAvailable = service.service_types?.includes(category); // Check if the category exists
            return (
              <div className={`service-item ${isAvailable ? "blue" : "gray"}`} key={category}>
                <span>{category}</span>
                <span className={`status ${isAvailable ? "success" : "failure"}`}>
                  {isAvailable ? "✔" : "✖"}
                </span>
              </div>
            );
          })}

          <button className="delivery-option" onClick={()=>navigate(`/rateProduct?id_service=${id_service}`)}>Rate This Service</button>

          <div className="profile-details">
            <p>
              <strong>Portfolio Website</strong>
              {service.portfolio_link}
            </p>
            <p>
              <strong>Social Media (IG)</strong>
              {service.instagram_handle}
            </p>
            <p>
              <strong>Telephone Number</strong>
              {service.phone_number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;