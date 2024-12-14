import '../style/ProductPage.css';
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import SavedProduct from './savedProducts';

const ProductPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState("product"); 
    const [isDropdownOpen, setDropdownOpen] = useState(false); 
    const [hoveredProduct, setHoveredProduct] = useState(null); 
    const [productslist, setProductslist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookmarkedItems, setBookmarkedItems] = useState(() => {
        const saved = localStorage.getItem("bookmarkedItems");
        return saved ? JSON.parse(saved) : {};
    });

    const queryParams= new URLSearchParams(location.search);
    const category = queryParams.get("category") || "All Categories";
    const [selectedProduct, setSelectedProduct] = useState(category);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleProductClick = (productName) => {
        setSelectedProduct(productName); // Update selected category
        setDropdownOpen(false); // Close the dropdown
    };

    useEffect(() => {
        localStorage.setItem("bookmarkedItems", JSON.stringify(bookmarkedItems));
    }, [bookmarkedItems]);

    const handleBookmarkClick = async (itemId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/products/savedproducts',
                { id_product: itemId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            const isBookmarked = response.data.isBookmarked;
            setBookmarkedItems((prevBookmarks) => ({
                ...prevBookmarks,
                [itemId]: isBookmarked,
            }));

            console.log(isBookmarked ? 'Saved to the bookmarked' : 'Removed from the bookmarked');
        } catch (error) {
            console.error('Error toggling bookmark:', error.response?.data || error.message);
        }
    };

    const products = [
        "Electronic Equipment",
        "Laboratory Equipment",
        "Food and Beverages",
        "Clothes",
        "Software/IoT Development Services",
        "Other",
        "All Categories"
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/products/');
                setProductslist(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredProducts = selectedProduct === "All Categories" 
        ? productslist 
        : productslist.filter(product => product.kategori === selectedProduct);

    return (
        <div className="productandsaved">
            <div className='productandsaved-navbar'>
                {/* Dropdown for category selection */}
                <div style={{ position: 'relative' }}>
                    <div
                        className="findproductpage"
                        style={{
                            background: active === "product" ? "linear-gradient(to right, #0072B8, #7ABCDE)" : "#f5f5f5",
                            color: active === "product" ? "white" : "rgba(0, 0, 0, 0.5)",
                        }}
                        onClick={() => {
                            setActive("product");
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
                                        backgroundColor: hoveredProduct === product ? "#FCDC00" : "white",
                                        transition: 'background-color 0.3s',
                                    }}
                                    onMouseEnter={() => setHoveredProduct(product)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                    onClick={() => handleProductClick(product)}
                                >
                                    {product}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Saved Products Tab */}
                <div
                    className="findsavedproduct"
                    style={{
                        background: active === "savedProduct" ? "linear-gradient(to right, #0072B8, #7ABCDE)" : "#f5f5f5",
                        color: active === "savedProduct" ? "white" : "rgba(0, 0, 0, 0.5)",
                    }}
                    onClick={() => setActive("savedProduct")}
                >
                    Saved Product
                </div>
            </div>

            <div className="container">
                {active === "product" && (
                    <div className="product-list">
                        {filteredProducts.length === 0 ? (
                            <div>No products available</div>
                        ) : (
                            filteredProducts.map((product) => (
                                <div 
                                    className="product-card" 
                                    key={product.id_product} 
                                    onClick={() => navigate(`/productDetail/${product.id_product}`)}
                                >
                                    <img src={product.product1_photo} alt={product.product_name} className="product-image" />
                                    <div className="product-info">
                                        <div className="product-brand">
                                            <span>{product.kategori}</span>
                                            <svg
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBookmarkClick(product.id_product);
                                                }}
                                                className={`bookmark-icon ${bookmarkedItems[product.id_product] ? 'active' : ''}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24px"
                                                height="24px"
                                            >
                                                <path
                                                    d="M6 2h12a1 1 0 0 1 1 1v18l-7-3-7 3V3a1 1 0 0 1 1-1z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="product-title">{product.product_name}</h3>
                                        <div className="price-rating">
                                            <span className="product-price">Rp.{product.price}</span>
                                            <div className="product-rating">
                                                <span className="star">⭐</span>
                                                <span className="rating">{product.avg_rating}</span>
                                                <span className="reviews">| {product.total_ratings} reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {active === "savedProduct" && (
                    <div className="saved-products">
                        <SavedProduct />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
