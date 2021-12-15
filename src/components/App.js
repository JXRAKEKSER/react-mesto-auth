import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {renderResponse} from "../utils/apiFunctions";
import {api} from "../utils/Api";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";



function App() {

    const [currentUser, setCurrentUser] = useState({about: '', avatar: '', cohort:'', name:'', _id: ''});
    useEffect(() => {
        renderResponse(api.getUserInfo(), (data) => {
            setCurrentUser(data);
        }, "#")
    }, []);
    const [editProfileState, setEditProfileState] = useState(false);
    const [editAvatarState, setEditAvatarState] = useState(false);
    const [addPlaceState, setAddPlaceState] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isLoading, setIsLoading] = useState(false);
     function   finallyHandler(){
        setIsLoading(false);
    }
    // стейт карточек
    const [cards, setCards] = useState([]);
    useEffect(() => {
        renderResponse(api.getPreloadsCards(), (data)=>{
            setCards(data);
        }, "#")
    }, []);
    // функции обратного вызова для управления поведением карточки
    const handleCardLike = (card) => {
        const isLiked = card.likes.some(like => like._id === currentUser._id);

        renderResponse(api.changeLikeCardStatus(card._id, !isLiked), newCard => {
            setCards((prevState) => {
                return prevState.map( stateItem => {
                    return stateItem._id === card._id ? newCard : stateItem;
                });
            });
        }, finallyHandler);
    }

    const handleCardDelete = (card) => {

        renderResponse(api.deleteCard(card._id), () => {
            setCards(prevState => {
                return prevState.filter( stateItem => stateItem._id !== card._id)
            });
        }, finallyHandler);

    }

    const handleAddMestoCard = ({name, link}) => {
        setIsLoading(true);
        renderResponse(api.postCard({name: name, link: link}), newCardData => {
            setCards([newCardData, ...cards]);
            setIsLoading(false);
            closeAllPopups();
        }, finallyHandler);
    }

    // функции обратного вызова для управления данными пользователя

    const handleUpdateUser = ({name, about}) => {
        setIsLoading(true);
        renderResponse(api.updateUserInfo({fio: name, aboutYourself: about}),data => {
            setCurrentUser({...currentUser, name: data.name, about: data.about})
            setIsLoading(false);
            closeAllPopups();
        }, finallyHandler);

    }

    const handleUpdateAvatar = ({avatar}) => {
        setIsLoading(true);
        renderResponse(api.updateAvatar({avatar}), data => {
            setCurrentUser({...currentUser, avatar: data.avatar});
            setIsLoading(false);
            closeAllPopups();
        }, finallyHandler);
    }


    // функции обратного вызова для окткрытия/закрытия попапов
    const handleEditAvatarClick = () => {
        setEditAvatarState(true);
    }
    const handleEditProfileClick = () => {
        setEditProfileState(true);
    }
    const handleAddPlaceClick = () => {
        setAddPlaceState(true);
    }
    const closeAllPopups = () => {
        setEditProfileState(false);
        setAddPlaceState(false);
        setEditAvatarState(false)
        setSelectedCard({});
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }


  return (
      <CurrentUserContext.Provider value={currentUser}>

        <Header />
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}/>
        <Footer />
          <EditProfilePopup isOpen={editProfileState}
                            onClose={closeAllPopups}
                            onUserUpdate={handleUpdateUser}
                            isLoading={isLoading}/>

          <EditAvatarPopup isOpen={editAvatarState}
                           onClose={closeAllPopups}
                           onUpdateAvatar={handleUpdateAvatar}
                           isLoading={isLoading}/>

          <AddPlacePopup isOpen={addPlaceState}
                         onClose={closeAllPopups}
                         onAddCard={handleAddMestoCard}
                         isLoading={isLoading}/>

          <PopupWithForm name={"confirm"} title={"Вы уверены?"}/>

          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      </CurrentUserContext.Provider>
  );
}

export default App;
