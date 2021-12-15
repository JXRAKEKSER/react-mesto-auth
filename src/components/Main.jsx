import React, {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";



function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}){

    const currentUser = useContext(CurrentUserContext);


    return(

            <main className="content">
                <section className="profile page__profile">
                    <div className="profile__avatar-container">
                        <img className="profile__avatar" src={currentUser.avatar}
                             alt="Аватар"/>
                        <button className="profile__avatar-edit-overlay" onClick={onEditAvatar}></button>
                    </div>

                    <div className="profile-info profile__profile-info">
                        <div className="profile-info__container">
                            <h1 className="profile-info__name">{currentUser.name}</h1>
                            <button className="profile-info__button-edit" type="button" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile-info__role">{currentUser.about}</p>
                    </div>

                    <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
                </section>
                <section className="elements page__elements">
                    {cards.map( (card) => {

                        return  (

                                <Card key={card._id}
                                      onCardClick={onCardClick}
                                      onCardLike={onCardLike}
                                      onCardDelete={onCardDelete}
                                      card={card}
                                />
                    )
                    } )}
                </section>

            </main>

    );
}

export default Main;