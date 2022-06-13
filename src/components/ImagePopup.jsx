import React from "react";

function ImagePopup({card, onClose}){
    return(
        <div onClick={onClose} className={`popup popup_opacity popup_type_picture ${card.name && "popup_opened"}`}>
            <div className="popup__container-photo">
                <button className="popup__button-close" type="button" onClick={onClose}></button>
                <img className="popup__photo" src={card.link} alt={card.name}/>
                <p className="popup__photo-name">{card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;