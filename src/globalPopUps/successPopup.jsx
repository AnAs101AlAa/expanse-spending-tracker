import { useState, useEffect } from "react";
import { CircleCheckBig } from "lucide-react";
import PropTypes from "prop-types";

export default function SuccessPopup(props) {
    const [visible, setVisible] = useState(true);
    const [fade, setFade] = useState('opacity-0');

    useEffect(() => {
        setFade('opacity-100');
        const timer = setTimeout(() => {
            setFade('opacity-0');
            setTimeout(() => {setVisible(false); props.setMessage('')}, 1000);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className={`w-[50%] h-[50px] fixed top-10 left-1/4 z-50 bg-green-500 text-white p-4 rounded-md shadow-md flex items-center transition-opacity duration-1000 ${fade}`}>
            <CircleCheckBig className="mr-2" />
            <span>{props.message}</span>
        </div>
    );
}

SuccessPopup.propTypes = {
    message: PropTypes.string.isRequired,
    setMessage: PropTypes.func
};