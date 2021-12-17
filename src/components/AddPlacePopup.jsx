import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {Input} from "./Input";

export const AddPlacePopup = ({isOpen, onClose, onAddCard, isLoading}) => {

    const [formState, setFormState] = useState({mestoName:'', mestoURL: ''});

    useEffect(() => {
        setFormState({mestoName:'', mestoURL: ''});

    }, [isOpen]);


    const handleChangeForm = (evt) => {
        const {name, value} = evt.target;
        setFormState({...formState, [name]:value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddCard({name: formState.mestoName, link: formState.mestoURL});

    }
    return(
        <PopupWithForm name={"card-add"} title={"Новое место"}
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
        >
            <Input value={formState.mestoName}
                   placeholder={"Название"}
                   id={"mesto-name"}
                   name={"mestoName"}
                   onChangeHandler={handleChangeForm} />
            <Input value={formState.mestoURL}
                   placeholder={"Ссылка на картинку"}
                   id={"mesto-url"}
                   name={"mestoURL"}
                   onChangeHandler={handleChangeForm}
                   type={"url"}/>
        </PopupWithForm>
    );
}
