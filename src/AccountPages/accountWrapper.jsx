// src/AccountPages/RouteWrapper.jsx
import propTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const RouteWrapper = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
            <div className="absolute inset-0">
                <video autoPlay loop muted className="w-full h-full object-cover">
                    <source src="/backgroundVid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {location.pathname != '/' && <Home onClick={() => navigate('/')} className="fixed hover:w-[45px] hover:h-[45px] transition-all duration-300 w-[40px] h-[40px] top-4 left-4 font-bold border-teal-400 border-2 rounded-full p-2 text-white"/>}
            </div>
            {children}
        </div>
    );
};

RouteWrapper.propTypes = {
    children: propTypes.node.isRequired
};

export default RouteWrapper;