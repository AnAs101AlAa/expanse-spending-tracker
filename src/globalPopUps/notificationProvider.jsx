// NotificationContext.js
import { createContext, useContext, useState } from 'react';
import ErrorPopup from './errorPopup';
import SuccessPopup from './successPopup';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [message, setMessage] = useState("");
    const [state, setState] = useState("");

    const showMessage = (msg, type) => {
        setMessage(msg);
        setState(type);
    };

    return (
        <NotificationContext.Provider value={showMessage}>
            {children}
            {state === "e" && <ErrorPopup message={message} setMessage={setState}/>}
            {state === "s" && <SuccessPopup message={message} setMessage={setState}/>}
        </NotificationContext.Provider>
    );
};