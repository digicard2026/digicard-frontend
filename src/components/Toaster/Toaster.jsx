import React, { useState, useEffect } from "react";

const Toaster = ({ message, type, onClose }) => {

    const [isVisible, setIsVisible] = useState(false);

    const typeStyles = {
        success: "bg-emerald-600 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-500 text-black",
    };

    useEffect(() => {
      
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false); 
            setTimeout(() => {
                if (onClose) onClose(); 
            }, 300); 
        }, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed top-0 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg transition-all duration-300 z-999999 ${isVisible ? "translate-y-10 opacity-100" : "-translate-y-20 opacity-0"
                } ${typeStyles[type] || typeStyles.info}`}
        >
            {message}
        </div>
    );
};

export default Toaster;
