import React from "react";

export const Input = ({maxLength, minLength, placeholder, onChangeHandler, value, name, id, type, styleModifier}) => {

    const handleChange = (evt) => {
        onChangeHandler(evt)
    }
    return(
        <>
            <input className={`popup__input ${styleModifier ? styleModifier : ''}`}
                   value={value}
                   placeholder={placeholder}
                   required
                   name={name}
                   id={id}
                   maxLength={maxLength}
                   minLength={minLength}
                   onChange={handleChange}
                   type={type}/>
            <span className="popup__input-error-info profile-name-error"></span>
        </>
    )
}