import "../style/Notfound.css"
import { useNavigate } from "react-router-dom"

const Notfound = () => {
    const navigate = useNavigate()
    return (
        <>
        <div className="pagenotfound39">
            <div className="ops39">
                Ooops...
            </div>
            <div className="t40439">
                <img src="/img/404notfound.png" alt="404 Not Found" />
            </div>
            <div className="tulisan39">
                Page Not Found
            </div>
        </div>
        
        </>
    )
}

export default Notfound