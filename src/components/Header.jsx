import React, {useContext} from "react";
import logo from '../source/images/svg-images/mesto_logo.svg';
import {Link, useRouteMatch} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";

 function Header({emailNav}) {
    const {path} = useRouteMatch();
    const authContext = useContext(AuthContext);

    const handleClickSignOut = () =>{
        localStorage.removeItem('jwt');
        authContext.handleQuit();
    }
     const getMarkUp = () => {
         if (path === '/'){
             return (<p className="header__menu">{`${emailNav}`} {<Link onClick={handleClickSignOut} className="header__menu-link" to="/sign-in">Выйти</Link>}</p>)
         }else{
             return  path === '/sign-up' ? (<Link  className="header__menu-link" to="../sign-in">Войти</Link>) : (<Link  className="header__menu-link" to="../sign-up">Регистрация</Link>)
         }
      }
    return(
        <header className="header page__header">
            <img className="header__logo" src={logo} alt="Лого"/>
            {getMarkUp()}
        </header>
    );
}

export default Header;