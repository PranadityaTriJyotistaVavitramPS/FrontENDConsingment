import "./Notfound.css"
import { useNavigate } from "react-router-dom"

const Notfound = () => {
    const navigate = useNavigate()
    return (
        <>
        <div className="pagenotfound">
            <div className="ops">
                Ooops...
            </div>
            <div className="t404">
                404
            </div>
            <div className="tulisan">
                Page Not Found
            </div>
        </div>
        
        </>
    )
}

export default Notfound