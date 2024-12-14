import "../style/Home.css"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { useState,useEffect } from "react";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate()
    const [productList, setProductList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [loading,setLoading] = useState(true);

    const handleCategoryClick = (category) =>{
        navigate(`/find?category=${encodeURIComponent(category)}`)
    }

   

    useEffect(()=>{
        const fetchProductData = async() =>{
            try {
                const response_product = await axios.get("http://localhost:5000/api/v1/products/newest");
                console.log(response_product.data);
                setProductList(response_product.data);
            } catch (error) {
                console.error('Error fetching products in Home.js', error)
            }
        }
        const fetchServiceData = async() =>{
            try {
                const response_service = await axios.get("http://localhost:5000/api/v1/services/randomService");
                console.log(response_service.data)
                setServiceList(response_service.data);
            } catch (error) {
                console.error('Error fetching services in service.js', error);
            }
        }
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchProductData(), fetchServiceData()]);
            setLoading(false);
        };
        fetchData();

    },[])


    return (

        <>  <Navbar />
            <div className="all">
            <div className="discover" id="discoverSection">
                <div className="gambardiscover">
                    <img src={`${process.env.PUBLIC_URL}/img/isometric.png`} alt=""></img>
                </div>
                <div className="tulisandiscover">
                    <div className="discoveryour">
                    Discover Your Ideal Product with Just a Few Clicks!
                    </div>
                    <div className="login">
                    <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
                <div className="jenis">
                    <div className="baris1jenis">
                        <div className="electronicequipment" onClick={()=>handleCategoryClick("Electronic Equipment")}>
                            Electronic Equipment
                        </div>
                        <div className="laboratoryequipment" onClick={()=>handleCategoryClick("Laboratory Equipment")}>
                            Laboratory Equipment
                        </div>
                        <div className="foodandbeverages" onClick={()=>handleCategoryClick("Food and Beverages")}>
                            Food and Beverages
                        </div>
                    </div>
                    <div className="baris2jenis">
                        <div className="clothes" onClick={()=>handleCategoryClick("Clothes")}>
                            Clothes
                        </div>
                        <div className="softwareiot">
                            Software/IoT Development Services
                        </div>
                        <div className="other" onClick={()=>handleCategoryClick("Other")}>
                            Other
                        </div>
                    </div>
                </div>
            </div>
            <div className="displayproduk">
                <div className="produk">
                    {loading? (
                        <p>Loading...</p>
                    ):(
                        productList.map((product) => {
                            return (
                                <div className="produk1" key={product.id_product}>
                                    <div className="produk11">
                                        <img 
                                            src={`${product.product1_photo}`} 
                                            alt="Produk Gambar" 
                                            style={{
                                                display: "block",        /* Menghilangkan spasi tambahan */
                                                margin: "auto",           /* Membuat gambar rata tengah */
                                                height: "100%",
                                                width: "100%",           /* Memenuhi tinggi kontainer */
                                                objectFit: "cover",       /* Memastikan gambar sesuai dengan frame */
                                                borderRadius: "10px"      /* Menyesuaikan radius border jika diperlukan */
                                            }} 
                                        />
                                    </div>
                                    <div className="produk12">
                                        <div className="namaharga">
                                            {product.product_name}
                                        </div>
                                        <div className="namaharga">
                                           Rp.{product.price}
                                        </div>
                                        <div className="toko">
                                            {product.seller_name}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    
                    
                </div>
                <div className="exploreproducts">
                    Explore Other Products
                </div>
            </div>
            <div className="about" id="aboutSection">
                    <div className="abouthima">
                        <div className="judulabout">
                            About HIMATEKKOM Consignment
                        </div>
                        <div className="deskripsiabout">
                            HIMATEKKOM Consignment is a website created as a platform for Computer Engineering students at ITS to share information about their business products. It provides convenient access for students seeking to purchase lab equipment and electronic components for final projects or coursework and offers Computer Engineering students at ITS the opportunity to market their professional services, including skills in application development, website creation, and IoT equipment.
                        </div>
                    </div>
            </div>
            <div className="bagianakhir">
                <div className="needwebappiot">
                    <div className="need">
                        <div className="need1">
                            <div className="need11">
                                Need Website, App Development or IoT Expertise? 
                                We’re Here to Help!
                            </div>
                            <div className="need12">
                                Look for a Professional
                            </div>
                        </div>
                        <div className="imageneed">
                            <img src={`${process.env.PUBLIC_URL}/img/group27.png`} alt=""></img>
                        </div>
                    </div>
                </div>
                <div className="professional">
                    {loading?(
                        <p>...Loading</p>
                    ):(
                        serviceList.map((service)=>{
                            return(
                                <div className="professional1" key={service.id_service}>
                                    <div className="professional11">
                                        <img 
                                            src={service.service_foto1} 
                                            alt="Produk Gambar" 
                                            style={{
                                                display: "block",        /* Menghilangkan spasi tambahan */
                                                margin: "auto",           /* Membuat gambar rata tengah */
                                                height: "100%",           /* Memenuhi tinggi kontainer */
                                                width: "100%",
                                                objectFit: "cover",       /* Memastikan gambar sesuai dengan frame */
                                                borderRadius: "10px"      /* Menyesuaikan radius border jika diperlukan */
                                            }} 
                                        />
                                    </div>
                                    <div className="professional12">
                                        <div className="fotoprofesional">
                                            <img 
                                                src={service.profile_image_url} 
                                                alt="Produk Gambar" 
                                                style={{
                                                    display: "block",        /* Menghilangkan spasi tambahan */
                                                    margin: "auto",           /* Membuat gambar rata tengah */
                                                    height: "100%",           /* Memenuhi tinggi kontainer */
                                                    width: "100%",
                                                    objectFit: "cover",       /* Memastikan gambar sesuai dengan frame */
                                                    borderRadius: "10px"      /* Menyesuaikan radius border jika diperlukan */
                                                }} 
                                            />
                                        </div>
                                        <div className="tulisanprofessional">
                                            <div className="namadia">
                                                {service.seller_name}
                                            </div>
                                            <div className="deskripsidia">
                                               {service.description}
                                            </div>
                                            <div className="hargadia">
                                                Mulai dari Rp{service.starting_price}
                                            </div>
                                            <div className="ratingdia">
                                                <i className="fas fa-star" style={{ color: 'white', marginRight: '5px' }}></i> 
                                                {service.avg_rating} ({service.total_ratings})
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )};
                    
                </div>
                <div className="copyright">
                    <div className="copyrightleft">
                        <div className="logo">
                            <img src="/img/logohimatekkom.png" alt="logo" />
                        </div>
                        <div className="himatekkom">
                            HIMATEKKOM Consignment
                        </div>
                    </div>
                    <div className="copyrightright">
                        <div className="alamat">
                            PQ8W+2MQ, Keputih, Kec. Sukolilo, Surabaya, Jawa Timur
                        </div>
                        <div className="instagram">
                            <div className="logoig">
                                <img src="/img/logoig.png" alt="logo" />
                            </div>
                            <div className="akun">
                                himatekkomits
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="horizontal-line"></hr>
                <div className="tulisanakhir">
                    © 2024 - HIMATEKKOM Consignment. All Rights Reserved
                </div>
            </div>
        </>
    )
}

export default Home