import "../style/Delivery.css";
import { useNavigate,useParams } from "react-router-dom";
import React, { useState,useEffect } from "react";
import axios from "axios";

const Delivery = () => {
    const navigate = useNavigate();
    const { id_product } = useParams(); 
    const [loading, setLoading] = useState(true); // Set initial loading state
    const [product, setProduct] = useState(null);
    const [activeOption, setActiveOption] = useState("pickup");

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/products/${id_product}`);
                const productData = response.data;
                setProduct({
                    ...productData,
                    googlemaplink: productData.googlemaplink || "Not Available",
                    ecommerce_phone: productData.ecommerce_phone || "Not Available", // Default value
                });
                console.log(productData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id_product]);

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    }

    return (
        <div className="alldelivery">
            <div className="backlogin" onClick={() => navigate(-1)}>
                Back
            </div>
            <div className="availabledeliveryoption">
                <div className="availabledeliveryoption2">
                    <div className="tulisanavailable">Available Delivery Option</div>
                    <div className="clickone">Click one of the options to select</div>
                    <div
                        className={`pickup ${activeOption === "pickup" ? "active" : ""}`}
                        onClick={() => handleOptionClick("pickup")}
                    >
                        <div className="text">Pick up at certain place</div>
                    </div>
                    <div
                        className={`request ${activeOption === "request" ? "active" : ""}`}
                        onClick={() => handleOptionClick("request")}
                    >
                        <div className="text">Request to the seller</div>
                    </div>
                </div>
                <div className="availabledeliveryoption3">
                    {activeOption === "pickup" ? (
                        <>
                            <img
                                src={`${process.env.PUBLIC_URL}/img/flyingrobot.png`}
                                alt=""
                                className="profile-image2"
                            />
                            <div className="tulisan1">Seller Place Address:</div>
                            <div className="tulisan2">{product.pickup? product.googlemaplink:"Not Available"}</div>
                        </>
                    ) : (
                        <>
                            <img
                                src={product.profile_image_url || `${process.env.PUBLIC_URL}/img/defaultprofile.png`}
                                alt=""
                                className="profile-image2"
                            />
                            <div className="tulisan1">You can chat to this number:</div>
                            <div className="tulisan2">{product.request? product.ecommerce_phone:"Not Available"}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Delivery;
