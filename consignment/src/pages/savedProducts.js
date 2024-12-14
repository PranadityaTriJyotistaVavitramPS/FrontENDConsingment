import axios from "axios";
import '../style/ProductPage.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

const SavedProduct = () => {
    const navigate = useNavigate();
    const [savedProducts, setSavedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookmarkedItems, setBookmarkedItems] = useState({});

    useEffect(() => {
        localStorage.setItem("bookmarkedItems", JSON.stringify(bookmarkedItems));
    }, [bookmarkedItems]);

    const fetchSavedProducts = async () => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const response = await axios.get('http://localhost:5000/api/v1/products/getSavedProducts', {
                headers: { 'Authorization': `Bearer ${token}` },
                withCredentials: true,
            });
            console.log('Fetched Saved Products:', response.data);
            setSavedProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching saved products:', error);
            if (error.response?.status === 401) {
                alert('Session expired. Please log in again.');
                navigate('/login');
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedProducts();
    }, [navigate]);

    useEffect(() => {
        const initializeBookmarkedItems = () => {
            const bookmarks = {};
            savedProducts.forEach((product) => {
                bookmarks[product.id_product] = true;
            });
            setBookmarkedItems(bookmarks);
        };

        if (!loading) {
            initializeBookmarkedItems();
        }
    }, [savedProducts, loading]);

    const handleBookmarkClick = async (itemId) => {
        const token = Cookies.get('token');
        try {
            await axios.post(
                'http://localhost:5000/api/v1/products/savedproducts',
                { id_product: itemId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            setBookmarkedItems((prevBookmarks) => ({
                ...prevBookmarks,
                [itemId]: !prevBookmarks[itemId],
            }));

            fetchSavedProducts();
        } catch (error) {
            console.error('Error toggling bookmark:', error.response?.data || error.message);
        }
    };

    return (
        <div className="productandsaved">
            <div className="container">
                {loading ? (
                    <div>Loading saved products...</div>
                ) : savedProducts.length === 0 ? (
                    <div>No products available</div>
                ) : (
                    <div className="product-list">
                        {savedProducts.map((product) => (
                            <div className="product-card" key={product.id_product}>
                                <img
                                    src={product.product1_photo}
                                    alt={product.product_name}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <div className="product-brand">
                                        <span>{product.kategori}</span>
                                        <svg
                                            onClick={() => handleBookmarkClick(product.id_product)}
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedProduct;
