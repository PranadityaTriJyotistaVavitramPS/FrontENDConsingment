import "./milihjualapa.css"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';




const SellSelection = () => {
    const navigate = useNavigate()
    const handleSellProductButton = () =>{
        navigate('/sellproduct')
    }
    const handleSellServiceButton =() =>{
        navigate('/sellservice')
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