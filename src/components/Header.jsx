import React from "react";
import logo from '../source/images/svg-images/mesto_logo.svg';
 function Header(){
    return(
        <header className="header page__header">
            <img className="header__logo" src={logo} alt="Лого"/>
        </header>
    );
}

export default Header;