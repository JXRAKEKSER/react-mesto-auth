import React, {useContext, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {Input} from "./Input";



export const EditProfilePopup = ({isOpen, onClose, onUserUpdate, isLoading}) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser]);
    const handleChangeName = (value) => {
        setName(value);
    }
    const handleChangeDescription = (value) => {
        setDescription(value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUserUpdate({name: name, about: description})
    }
    return(
        <PopupWithForm name={"profile"} title={"Редактировать профиль"}
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
        >
            <Input maxLength="40"
                   minLength="2"
                   onChangeHandler={handleChangeName}
                   value={name}
                   placeholder="Имя"
                   name="fio"
                   id="profile-name"/>
            <Input maxLength="200"
                   minLength="2"
                   onChangeHandler={handleChangeDescription}
                   value={description}
                   placeholder="О себе"
                   name="aboutYourself"
                   id="profile-about" />
        </PopupWithForm>
    )
}
