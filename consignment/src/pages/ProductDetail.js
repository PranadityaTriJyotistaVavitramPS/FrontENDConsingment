import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/ProductDetail.css';

const ProductDetail = () => {
  const { id_product } = useParams(); // Get id_product from URL
  const navigate = useNavigate(); // To handle navigation
  const [product, setProduct] = useState(null); // To store product details
  const [images, setImages] = useState([]); // Store product images
  const [mainImageIndex, setMainImageIndex] = useState(0); // Index of the current main image
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/products/${id_product}`
        ); // Replace with your backend API endpoint
        const productData = response.data;

        setProduct(productData);
        setImages([
          productData.product1_photo,
          productData.product2_photo,
          productData.product3_photo,
        ].filter(Boolean)); // Filter out null or undefined images
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id_product]);

  const handlePreviousClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="layout">
        <div className="image-section">
          <div className="product-images">
            <img
              src={images[mainImageIndex]}
              alt="Main Product"
              className="main-image"
            />
            <div className="image-navigation">
              <img
                src="/img/button2.png"
                alt="Previous"
                className="nav-button"
                onClick={handlePreviousClick}
              />
              <img
                src="/img/button.png"
                alt="Next"
                className="nav-button"
                onClick={handleNextClick}
              />
            </div>
          </div>
          <div className="image-thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setMainImageIndex(index)}
                className={`thumbnail ${index === mainImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="product-details">
          <div className="details-header">
            <span className="category">Category: {product.kategori}</span>
            <div className='product-fasilitas'>
              <button className="delivery-option" onClick={()=>navigate(`/delivery/${id_product}`)}>Check Available Delivery Option</button>
              <button className="delivery-option" onClick={()=>navigate(`/rateProduct?id_product=${id_product}`)}>Rate This Product</button>
            </div>

          </div>
          <h1>⭐ {product.avg_rating} ({product.total_ratings} rating)</h1>
          <p>{product.product_desc}</p>
          <ul>
            <li>
              <strong>Price:</strong> Rp.{product.price}
            </li>
            <li>
              <strong>Phone:</strong> {product.phone_number}
            </li>
            <li>
              <strong>Link:</strong>{' '}
              <a
                href={product.product_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {product.product_link}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="profile-container">
        <div className="profile-box">
          <img
            src={product.profile_image_url || '/img/profilepicture.png'}
            alt="Profile"
            className="profile-img"
          />
          <p>{product.seller_name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
