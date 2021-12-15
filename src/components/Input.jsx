import React from "react";

export const Input = ({maxLength, minLength, placeholder, onChangeHandler, value, name, id, type}) => {

    const handleChange = (evt) => {
        onChangeHandler(evt.target.value)
    }
    return(
        <>
            <input className="popup__input"
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