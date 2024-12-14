import React, { useState,useEffect } from "react";
import "../style/ServicePage.css";
import axios from "axios";

const ServicePage = () => {
  const categories = ["Website", "Aplikasi", "IoT"];
  const [serviceList,setServiceList] = useState([])
  const [activeCategory, setActiveCategory] = useState("Website");
  const [loading,setLoading] = useState(true)

  const filteredServices = serviceList.filter(
    (service) => service.service_types.includes(activeCategory)
  );
  

  useEffect(()=>{
    const fetchServices = async() =>{
      try {
        const response = await axios.get('http://localhost:5000/api/v1/services');
        setServiceList(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }

    fetchServices();
  },[])

  if(loading){
    return <div>....Loading</div>
  }

  

  const handleServiceClick = (serviceId) => {
    // Navigate to service details page
    window.location.href = `/serviceDetail/${serviceId}`;
  };

  return (
    <div className="container">
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services */}
      <div className="services">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id_service}
              className="service-cards"
              onClick={() => handleServiceClick(service.id_service)}
            >
              <img
                src={service.service_foto1}
                alt={service.name}
                className="service-image"
              />
              <div className="service-info">
                    <div className="profile-row">
                        <img
                            src={service.profile_image_url}
                            alt="Profile"
                            className="profile-icon"
                        />
                        <h3 className="profile-name">{service.seller_name}</h3>
                    </div>
                    <p className="service-description">{service.description}</p>
                    <div className="service-rating">
                        <span className="rating-star">⭐</span>
                        <span>{service.avg_rating}</span>
                        <span>({service.total_ratings})</span>
                    </div>
                    <p className="service-price">From Rp.{service.starting_price}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No services available in this category.</div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
