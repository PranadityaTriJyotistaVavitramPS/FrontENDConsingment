import "../style/Rateaproduct.css";
import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";

const Rateaproduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search)

    const [rating, setRating] = useState(0); // State untuk menyimpan nilai rating
    const [product,setProduct] = useState([]);
    
    const id_product = queryParams.get("id_product");
    const id_service = queryParams.get("id_service");

    // Fungsi untuk mengatur rating
    const handleRating = (index) => {
        setRating(index);
    };

    const isProduct = Boolean(id_product); 
    const isService = Boolean(id_service); 



  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/products/${id_product}`
        ); // Replace with your backend API endpoint
        const productData = response.data;
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product details:', err);
      }
    };
    fetchProductDetails();
  }, [id_product]);

    // Fungsi untuk menangani klik tombol
    const handleSendClick = async () => {
        const token = Cookies.get('token'); // Get token from cookies
    
        // Validate if the token is missing
        if (!token) {
            alert('You need to log in to submit a rating.');
            navigate('/login'); // Redirect to login if no token
            return;
        }
    
        // Determine endpoint based on id_product or id_service
        let endpoint = '';
        if (isProduct) {
            endpoint = `http://localhost:5000/api/v1/ratings/makeRating/${id_product}`;
        } else if (isService) {
            endpoint = `http://localhost:5000/api/v1/ratings/makeRating/${id_service}`;
        } else {
            alert('No product or service ID provided.');
            return; // Stop if neither id_product nor id_service is provided
        }
    
        try {
            // Send the rating data to the API using axios
            const response = await axios.post(
                endpoint,
                { rating }, // Pass rating as the body
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Pass token in the header
                    },
                    withCredentials:true
                }
            );
    
            // Handle success response
            if (response.status === 200 || response.status === 201) {
                alert('Thank you for your rating!');
                navigate(-1); // Navigate back after success
            } else {
                alert(`Failed to send rating: ${response.data.message || 'Unknown error'}`);
            }

        } catch (error) {
            console.error('Error sending rating:', error);
            alert('An error occurred while sending your rating. Please try again.');
        }
    };

    return (
        <>  <div className="backlogin" onClick={() => navigate(-1)}>
                Back
            </div>
            <div className="allrateproduct">
                <div className="namaproduk">
                    {isProduct? product.product_name : "Rating Pelayanan" }
                </div>
                <div className="bintang">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                        <span
                            key={index}
                            className={`star ${index < rating ? 'active' : ''}`}
                            onClick={() => handleRating(index + 1)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <p>Rate: {rating}</p> {/* Menampilkan nilai rating */}
                <div className="tombolsend" onClick={handleSendClick}>
                    Send Your Rating
                </div>
            </div>
        </>
    );
};

export default Rateaproduct;
