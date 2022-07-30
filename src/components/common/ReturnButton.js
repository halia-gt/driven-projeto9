import { IconContext } from "react-icons";
import { IoIosReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function ReturnButton({ returnTo }) {
    const navigate = useNavigate();
    
    return (
            <IconContext.Provider value={{ color: "#E8833A", size: "2em", className: "react-icon" }}>
                <IoIosReturnLeft onClick={() => { navigate(returnTo) }} />
            </IconContext.Provider>
    )
}