import React from "react";


export const InfoToolTip = ({name, isOpen, onClose, icon, title, alt}) => {

    return(
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__button-close" onClick={onClose} type="button"></button>
                <img className="popup__reg-icon" src={icon} alt={alt}/>
                <h2 className="popup__title popup__title_color_black popup__title_type_notification">{title}</h2>
            </div>
        </div>
    );
}