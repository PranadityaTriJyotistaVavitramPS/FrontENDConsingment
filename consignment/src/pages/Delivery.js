import "./Delivery.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Delivery = () => {
    const navigate = useNavigate();
    const [activeOption, setActiveOption] = useState("pickup"); // State untuk pilihan aktif

    // Fungsi untuk menangani klik
    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    return (
        <>
            <div className="alldelivery">
                <div className="backdelivery" onClick={() => navigate(-1)}>
                    Back
                </div>
                <div className="availabledeliveryoption">
                    <div className="availabledeliveryoption2">
                        <div className="tulisanavailable">
                            Available Delivery Option
                        </div>
                        <div className="clickone">
                            Click one of the options to select
                        </div>
                        <div
                            className={`pickup ${
                                activeOption === "pickup" ? "active" : ""
                            }`}
                            onClick={() => handleOptionClick("pickup")}
                        >
                            <div className="text">Pick up at certain place</div>
                        </div>
                        <div
                            className={`request ${
                                activeOption === "request" ? "active" : ""
                            }`}
                            onClick={() => handleOptionClick("request")}
                        >
                            <div className="text">Request to the seller</div>
                        </div>
                    </div>
                    <div className="availabledeliveryoption3">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/flyingrobot.png`}
                            alt="Profile Picture"
                            className="profile-image"
                        />
                        <div className="tulisan1">Seller Place Address:</div>
                        <div className="tulisan2">
                            Jl. Kenanga, No. 18, RT. 03, RW. 03, Keboansikep,
                            Gedangan, Sidoarjo
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Delivery;
