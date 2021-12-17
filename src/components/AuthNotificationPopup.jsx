import React from "react";

export const AuthnNotificationPopup = ({name, isOpen, onClose, children}) => {
    return(
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__button-close" onClick={onClose} type="button"></button>
                {children}
            </div>
        </div>
    );
}