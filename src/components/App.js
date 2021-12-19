import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {renderResponse} from "../utils/apiFunctions";
import {api} from "../utils/Api";
import * as authApi from '../utils/authApi';
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {Route, Switch, useHistory} from 'react-router-dom'
import {ProtectedRoute} from "./ProtectedRoute";
import {Register} from "./Register";
import {Login} from "./Login";
import {InfoToolTip} from "./InfoToolTip";
import successIcon from '../source/images/svg-images/success-icon.svg';
import errorIcon from '../source/images/svg-images/error-icon.svg';
import {AuthContext} from "../contexts/AuthContext";

function App() {

    const [currentUser, setCurrentUser] = useState({about: '', avatar: '', cohort:'', name:'', _id: '', email: ''});

    // хук для навигации с помощью brouser router
    const history = useHistory();

    const [location, setLocation] = useState(history.location.pathname);
    const handleLocation = (value) => {
        setLocation(value);
    }
    const [editProfileState, setEditProfileState] = useState(false);
    const [editAvatarState, setEditAvatarState] = useState(false);
    const [addPlaceState, setAddPlaceState] = useState(false);
    const [successfulRegState, setSuccessfulRegState] = useState(false);
    const [errorRegState, setErrorRegState] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [emailNav, setEmailNav] = useState('');
     function   finallyHandler(){
        setIsLoading(false);
    }
    // стейт карточек
    const [cards, setCards] = useState([]);
    useEffect(() => {
        renderResponse(api.getPreloadsCards(), (data)=>{
            setCards(data);
        }, "#")
        renderResponse(api.getUserInfo(), (data) => {
            setCurrentUser({...currentUser, about: data.about, avatar: data.avatar, cohort: data.cohort, name: data.name, _id: data._id});
        }, "#")
        if(localStorage.getItem('jwt')){
            const jwt = localStorage.getItem('jwt');
            authApi.getUserCredentials(jwt).then( ({email, _id}) => {
                handleLoggedIn();
                handleEmailNav(email);

                history.push('/');
            });

        }
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
            closeAllPopups();
        }, finallyHandler);
    }

    // функции обратного вызова для управления данными пользователя

    const handleUpdateUser = ({name, about}) => {
        setIsLoading(true);
        renderResponse(api.updateUserInfo({fio: name, aboutYourself: about}),data => {
            setCurrentUser({...currentUser, name: data.name, about: data.about})
            closeAllPopups();
        }, finallyHandler);

    }

    const handleUpdateAvatar = ({avatar}) => {
        setIsLoading(true);
        renderResponse(api.updateAvatar({avatar}), data => {
            setCurrentUser({...currentUser, avatar: data.avatar});
            closeAllPopups();
        }, finallyHandler);
    }

    //обработчики для стейта авторизации
    const handleLoggedIn = () => {
        setAuthUser({...authUser, isLoggedIn: true});
    }
    const handleLoggOut = () => {
        setAuthUser({...authUser, isLoggedIn: false});
    }
    const handleEmailNav = value => {
        setEmailNav(value)
    }

    const [authUser, setAuthUser] = useState({isLoggedIn: false, handleLogin: handleLoggedIn, handleQuit: handleLoggOut, handleEmailNav: handleEmailNav});

    // функции обратного вызова для открытия/закрытия попапов
    const handleEditAvatarClick = () => {
        setEditAvatarState(true);
    }
    const handleEditProfileClick = () => {
        setEditProfileState(true);
    }
    const handleAddPlaceClick = () => {
        setAddPlaceState(true);
    }
    const handleSuccessfullReg = () => {
        setSuccessfulRegState(true);
    }
    const handleErrorReg = () => {
        setErrorRegState(true);
    }
    const closeAllPopups = () => {
        setEditProfileState(false);
        setAddPlaceState(false);
        setEditAvatarState(false);
        setSuccessfulRegState(false);
        setErrorRegState(false);
        setSelectedCard({});
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }


  return (
      <AuthContext.Provider value={authUser}>
          <CurrentUserContext.Provider value={currentUser}>

              <Header emailNav={emailNav} location={location}/>
              <Switch>

                  <ProtectedRoute component={Main}
                                      path="/"
                                      emailNav={emailNav}
                                      onLocation={handleLocation}
                                      exact={true}
                                      onEditProfile={handleEditProfileClick}
                                      onAddPlace={handleAddPlaceClick}
                                      onEditAvatar={handleEditAvatarClick}
                                      onCardClick={handleCardClick}
                                      onCardLike={handleCardLike}
                                      onCardDelete={handleCardDelete}
                                      cards={cards} />
                  <Route path="/sign-up">

                      <Register onSuccessfullReg={handleSuccessfullReg}
                                onErrorReg={handleErrorReg}
                                onLocation={handleLocation}/>
                  </Route>
                  <Route path="/sign-in">

                      <Login onErrorLoggedIn={handleErrorReg}
                             onEmail={handleEmailNav}
                             onLocation={handleLocation}/>
                  </Route>
              </Switch>
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

              <InfoToolTip name="success-register"
                                      isOpen={successfulRegState}
                                      onClose={closeAllPopups}
                                      icon={successIcon}
                                      title="Вы успешно зарегестрировались!"
                                      alt="Иконка успешной регистрации"/>

              <InfoToolTip name="error-register"
                                      isOpen={errorRegState}
                                      onClose={closeAllPopups}
                                      icon={errorIcon} title="Что-то пошло не так! Попробуйте ещё раз."
                                      alt="Иконка неуспешной регистрации" />

          </CurrentUserContext.Provider>
      </AuthContext.Provider>
  );
}

export default App;
