import { Link } from "react-router-dom"
import ConnectWallet from "./ConnectWallet";
import '../App.css';
const Navbar = () => {
    return (
        <div className = "navbar">
            <ul>
                <li>
                    <Link to = "/Login" >Cerrar sesión</Link> 
                </li>

            </ul> 
            <ConnectWallet/>
        </div> 

    )
}

export default Navbar;