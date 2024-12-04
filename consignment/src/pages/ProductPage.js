import './ProductPage.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductPage = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState("product"); 
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState("Product");
    const [hoveredProduct, setHoveredProduct] = useState(null); // Untuk melacak opsi yang sedang di-hover

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleProductClick = (productName) => {
        setSelectedProduct(productName); // Mengubah nama tombol
        setDropdownOpen(false); // Menutup dropdown
    };

    const products = [
        "Electronic Equipment",
        "Laboratory Equipment",
        "Food and Beverages",
        "Clothes",
        "Software/IoT Development Services",
        "Other",
    ];

    return (
        <div className="productandsaved">
            <div style={{ position: 'relative' }}>
                <div
                    className="findproductpage"
                    style={{
                        background: active === "productpage" ? "linear-gradient(to right, #0072B8, #7ABCDE)" : "#f5f5f5",
                        color: active === "productpage" ? "white" : "rgba(0, 0, 0, 0.5)", // Warna teks
                    }}
                    onClick={() => {
                        setActive("productpage");
                        toggleDropdown();
                    }}
                >
                    {selectedProduct}
                </div>

                {isDropdownOpen && (
                    <div className="dropdown-content">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '5px 0',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    backgroundColor: hoveredProduct === product ? "#FCDC00" : "white", // Warna berubah saat hover
                                    transition: 'background-color 0.3s', // Animasi transisi
                                }}
                                onMouseEnter={() => setHoveredProduct(product)} // Saat kursor masuk
                                onMouseLeave={() => setHoveredProduct(null)}   // Saat kursor keluar
                                onClick={() => handleProductClick(product)}
                            >
                                {product}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div
                className="findsavedproduct"
                style={{
                    background: active === "savedpage" ? "linear-gradient(to right, #0072B8, #7ABCDE)" : "red",
                    color: active === "savedpage" ? "white" : "rgba(0, 0, 0, 0.5)", // Warna teks
                }}
                onClick={() => setActive("savedpage")}
            >
                My Product
            </div>
        </div>
    );
};

export default ProductPage;
