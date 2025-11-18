import {  useNavigate } from "react-router-dom";
import OlxLogo from "../assets/olx-logo.png"; 


const Logo = () => {
   const navigate = useNavigate();
  return (
    <button className="flex items-center gap-0.5"
    onClick={() => navigate("/")}>
       <img
        src={OlxLogo}
        alt="OLX Logo"
        className="h-16 w-auto" 
      />
    </button>
  );
};

export default Logo;
