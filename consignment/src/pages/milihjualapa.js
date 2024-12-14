import "../style/milihjualapa.css"
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'


const SellSelection = () => {
    const token = Cookies.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token === undefined) {
            navigate('/unauthorized');
        }
    }, [navigate,token]);

    if(token === undefined){
        navigate('/unauthorized');
    }
    const handleSellProductButton = () =>{
        navigate('/sellproduct');
    }
    const handleSellServiceButton =() =>{
        navigate('/sellservice');
    }
    return (
        <>
        <div className="pagenotfound">
            <div className="tulisankliksalahsatu">
                Click One Of These
            </div>
            <div className="duapilihan">
                <div className="pilihansellaproduct" onClick={handleSellProductButton}>
                    <Link> Sell A Product</Link>
                </div>
                <div className="pilihansellaservice" onClick={handleSellServiceButton}>
                    <Link>Sell A Service
                    (App, Website, IoT)
                    </Link>
                    
                </div>
            </div>
        </div>
        
        </>
    )
}

export default SellSelection