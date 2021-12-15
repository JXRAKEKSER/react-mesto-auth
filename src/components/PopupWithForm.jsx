import React from "react";

function PopupWithForm({name, title, isOpen, onClose, onSubmit, children, isLoading}){
    return(
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__button-close" onClick={onClose} type="button"></button>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <input className="popup__button-save" type="submit" value={isLoading ? 'Сохранить...' : 'Сохранить'}/>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;