import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar, isLoading}) => {

    const inputRef = useRef();
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateAvatar({avatar: inputRef.current.value});
        inputRef.current.value = '';
    }


    return(
        <PopupWithForm name={"edit-avatar"} title={"Обновить аватар"}
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
        >
            <input className="popup__input"
                   defaultValue=""
                   placeholder="Ссылка на фото"
                   required
                   name="avatar"
                   id="profile-avatar"
                   type="url" ref={inputRef}/>

            <span className="popup__input-error-info profile-avatar-error"></span>
        </PopupWithForm>
    );
}