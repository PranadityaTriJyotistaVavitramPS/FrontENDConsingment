import "../style/Find.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductPage from "./ProductPage";
import ServicePage from "./ServicePage";

const Find = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState("product"); // Default aktif adalah "product"

    return (
        <>
            <div className="allfind2">
                <div className="allfind">
                    <div className="back" onClick={() => navigate(-1)}>
                        Back
                    </div>
                    <div className="productandservice">
                        <div
                            className="findproduct"
                            style={{
                                background: active === "product" ? "linear-gradient(to right, #0072B8, #7ABCDE)" : "#f5f5f5",
                                color: active === "product" ? "white" : "rgba(0, 0, 0, 0.5)", // Warna teks
                            }}
                            onClick={() => setActive("product")}
                        >
                            Product
                        </div>
                        <div
                            className="findservice"
                            style={{
                                background: active === "service" ? "linear-gradient(to right, #0072B8, #7ABCDE)" : "#f5f5f5",
                                color: active === "service" ? "white" : "rgba(0, 0, 0, 0.5)", // Warna teks
                            }}
                            onClick={() => setActive("service")}
                        >
                            Service
                        </div>
                    </div>
                    
                    <div className="page-content">
                        {active === "product" && <ProductPage/>}
                        {active === "service" && <ServicePage />}
                    </div>
                </div>
            </div>

            

        </>
    );
};

export default Find;
