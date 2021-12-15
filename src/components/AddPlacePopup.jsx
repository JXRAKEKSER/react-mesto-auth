import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {Input} from "./Input";

export const AddPlacePopup = ({isOpen, onClose, onAddCard, isLoading}) => {
    const [mestoName, setMestoName] = useState('');
    const [mestoLink, setMestoLink] = useState('');


    useEffect(() => {
        handleChangeMestoLink('');
        handleChangeMestoName('');

    }, [isOpen]);

    const handleChangeMestoName = (value) => {
        setMestoName(value);
    }
    const handleChangeMestoLink = (value) => {
        setMestoLink(value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddCard({name: mestoName, link: mestoLink});

    }
    return(
        <PopupWithForm name={"card-add"} title={"Новое место"}
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
        >
            <Input value={mestoName}
                   placeholder={"Название"}
                   id={"mesto-name"}
                   name={"mestoName"}
                   onChangeHandler={handleChangeMestoName} />
            <Input value={mestoLink}
                   placeholder={"Ссылка на картинку"}
                   id={"mesto-url"}
                   name={"mestoURL"}
                   onChangeHandler={handleChangeMestoLink}
                   type={"url"}/>
        </PopupWithForm>
    );
}
