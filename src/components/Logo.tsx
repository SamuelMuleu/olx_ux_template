import {  useNavigate } from "react-router-dom";

const Logo = () => {
   const navigate = useNavigate();
  return (
    <button className="flex items-center gap-0.5"
    onClick={() => navigate("/")}>
      <span className="text-3xl font-bold text-primary">o</span>
      <span className="text-3xl font-bold text-accent">l</span>
      <span className="text-3xl font-bold" style={{ color: '#50C878' }}>x</span>
    </button>
  );
};

export default Logo;
 <button
                
                className="text-accent hover:underline font-normal"
              >
                Fazer login
              </button>