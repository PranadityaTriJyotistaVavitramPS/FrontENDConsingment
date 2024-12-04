import "./Home.css"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Home = () => {
    const navigate = useNavigate()
    return (

        <>  <Navbar />
            <div className="all">
                
            <div className="discover" id="discoverSection">
                <div className="gambardiscover">
                    <img src={`${process.env.PUBLIC_URL}/img/isometric.png`} alt="Profile Picture"></img>
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
                        <div className="electronicequipment">
                            Electronic Equipment
                        </div>
                        <div className="laboratoryequipment">
                            Laboratory Equipment
                        </div>
                        <div className="foodandbeverages">
                            Food and Beverages
                        </div>
                    </div>
                    <div className="baris2jenis">
                        <div className="clothes">
                            Clothes
                        </div>
                        <div className="softwareiot">
                            Software/IoT Development Services
                        </div>
                        <div className="other">
                            Other
                        </div>
                    </div>
                </div>
            </div>
            <div className="displayproduk">
                <div className="produk">
                    <div className="produk1">
                        <div className="produk11">
                        <img 
                            src={`${process.env.PUBLIC_URL}/img/group16.png`} 
                            alt="Produk Gambar" 
                            style={{
                                display: "block",        /* Menghilangkan spasi tambahan */
                                margin: "auto",           /* Membuat gambar rata tengah */
                                height: "100%",           /* Memenuhi tinggi kontainer */
                                objectFit: "cover",       /* Memastikan gambar sesuai dengan frame */
                                borderRadius: "10px"      /* Menyesuaikan radius border jika diperlukan */
                            }} 
                        />
                        </div>
                        <div className="produk12">
                            <div className="namaharga">
                                Baju Pink
                            </div>
                            <div className="namaharga">
                                Rp100.000,00
                            </div>
                            <div className="toko">
                                Nama Toko
                            </div>
                        </div>
                    </div>
                    <div className="produk1">
                        <div className="produk11">
                        <img 
                            src={`${process.env.PUBLIC_URL}/img/shoes.png`} 
                            alt="Produk Gambar" 
                            style={{
                                display: "block",        /* Menghilangkan spasi tambahan */
                                margin: "auto",           /* Membuat gambar rata tengah */
                                width: "100%",           /* Memenuhi tinggi kontainer */
                                objectFit: "cover",       /* Memastikan gambar sesuai dengan frame */
                                borderRadius: "10px"      /* Menyesuaikan radius border jika diperlukan */
                            }} 
                        />
                        </div>
                        <div className="produk12">
                            <div className="namaharga">
                                Sepatu Wanita
                            </div>
                            <div className="namaharga">
                                Rp500.000,00
                            </div>
                            <div className="toko">
                                Nama Toko
                            </div>
                        </div>
                    </div>
                    <div className="produk1">
                        <div className="produk11">
                        <img 
                            src={`${process.env.PUBLIC_URL}/img/computerset.png`} 
                            alt="Produk Gambar" 
                            style={{
                                display: "block",        /* Menghilangkan spasi tambahan */
                                margin: "auto",           /* Membuat gambar rata tengah */
                                width: "100%",           /* Memenuhi tinggi kontainer */
                                objectFit: "cover",       /* Memastikan gambar sesuai dengan frame */
                                borderRadius: "10px"      /* Menyesuaikan radius border jika diperlukan */
                            }} 
                        />
                        </div>
                        <div className="produk12">
                            <div className="namaharga">
                                Satu set PC
                            </div>
                            <div className="namaharga">
                                Rp7.500.000,00
                            </div>
                            <div className="toko">
                                Nama Toko
                            </div>
                        </div>
                    </div>
                    <div className="produk1">
                        <div className="produk11">
                        <img 
                            src={`${process.env.PUBLIC_URL}/img/headset.png`} 
                            alt="Produk Gambar" 
                            style={{
                                display: "block",        /* Menghilangkan spasi tambahan */
                                margin: "auto",           /* Membuat gambar rata tengah */
                                height: "100%",           /* Memenuhi tinggi kontainer */
                                objectFit: "cover",       /* Memastikan gambar sesuai dengan frame */
                                borderRadius: "10px"      /* Menyesuaikan radius border jika diperlukan */
                            }} 
                        />
                        </div>
                        <div className="produk12">
                        <div className="namaharga">
                                Headset
                            </div>
                            <div className="namaharga">
                                Rp200.000,00
                            </div>
                            <div className="toko">
                                Nama Toko
                            </div>
                        </div>
                    </div>
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
                            <img src={`${process.env.PUBLIC_URL}/img/group27.png`} alt="Image Need"></img>
                        </div>
                    </div>
                </div>
                <div className="professional">
                    <div className="professional1">
                        <div className="professional11">
                            <img 
                                src={`${process.env.PUBLIC_URL}/img/ss1.png`} 
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
                                    src={`${process.env.PUBLIC_URL}/img/sss1.png`} 
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
                                    Akibur Rahman
                                </div>
                                <div className="deskripsidia">
                                    Saya adalah seorang web developer yang mampu membuat website menggunakan Vue.js dan PHP untuk...
                                </div>
                                <div className="hargadia">
                                    Mulai dari Rp100.000,00
                                </div>
                                <div className="ratingdia">
                                    <i className="fas fa-star" style={{ color: 'white', marginRight: '5px' }}></i> 
                                    5.0 (332)
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="professional1">
                        <div className="professional11">
                            <img 
                                src={`${process.env.PUBLIC_URL}/img/ss2.png`} 
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
                                    src={`${process.env.PUBLIC_URL}/img/sss2.png`} 
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
                                    Alice Lee
                                </div>
                                <div className="deskripsidia">
                                    Saya adalah seorang web developer yang mampu membuat website menggunakan Vue.js dan PHP untuk...
                                </div>
                                <div className="hargadia">
                                    Mulai dari Rp100.000,00
                                </div>
                                <div className="ratingdia">
                                    <i className="fas fa-star" style={{ color: 'white', marginRight: '5px' }}></i> 
                                    5.0 (332)
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="professional1">
                        <div className="professional11">
                            <img 
                                src={`${process.env.PUBLIC_URL}/img/ss3.png`} 
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
                                    src={`${process.env.PUBLIC_URL}/img/sss3.png`} 
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
                                    Catherine Lia
                                </div>
                                <div className="deskripsidia">
                                    Saya adalah seorang web developer yang mampu membuat website menggunakan Vue.js dan PHP untuk...
                                </div>
                                <div className="hargadia">
                                    Mulai dari Rp100.000,00
                                </div>
                                <div className="ratingdia">
                                    <i className="fas fa-star" style={{ color: 'white', marginRight: '5px' }}></i> 
                                    5.0 (332)
                                </div>
                            </div>
                        </div>
                    </div>
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
                <hr class="horizontal-line"></hr>
                <div className="tulisanakhir">
                    © 2024 - HIMATEKKOM Consignment. All Rights Reserved
                </div>
            </div>
        </>
    )
}

export default Home