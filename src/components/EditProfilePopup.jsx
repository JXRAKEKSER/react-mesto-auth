import React, {useContext, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {Input} from "./Input";



export const EditProfilePopup = ({isOpen, onClose, onUserUpdate, isLoading}) => {
    const currentUser = useContext(CurrentUserContext);

    const [formState, setFormState] = useState({fio:'', aboutYourself: ''});
    useEffect(() => {
        setFormState({fio: currentUser.name, aboutYourself: currentUser.about})
    }, [currentUser]);
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormState({...formState, [name]: value});
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUserUpdate({name: formState['fio'], about: formState['aboutYourself']})
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
                   onChangeHandler={handleChange}
                   value={formState['fio']}
                   placeholder="Имя"
                   name="fio"
                   id="profile-name"/>
            <Input maxLength="200"
                   minLength="2"
                   onChangeHandler={handleChange}
                   value={formState['aboutYourself']}
                   placeholder="О себе"
                   name="aboutYourself"
                   id="profile-about" />
        </PopupWithForm>
    )
}
