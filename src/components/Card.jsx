import React, {useContext} from "react";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({onCardClick, onCardLike, onCardDelete, card}){

    const currentUser = useContext(CurrentUserContext);
    const handleCardClick = () => {
        onCardClick({link:card.link, name: card.name});
    }
    const handleLikeClick = () => {
        onCardLike(card);
    }
    const handleDeleteCard = () => {
        onCardDelete(card);
    }
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some( like => like._id === currentUser._id);
    const elementLikeClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;
    return(
        <article className="element">
            {isOwn && <button className="element__trash" type="button" onClick={handleDeleteCard}></button>}
            <img className="element__photo" src={card.link} alt={`Фото ${card.name}`} onClick={handleCardClick}/>
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button className={elementLikeClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>

    );
}

export default Card;