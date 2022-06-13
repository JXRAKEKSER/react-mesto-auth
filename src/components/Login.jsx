import React, {useContext, useState, useEffect} from "react";
import {Input} from "./Input";
import {SignButton} from "./SignButton";
import * as authApi from '../utils/authApi';
import { api } from "../utils/Api";
import {useHistory, useRouteMatch} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
export const Login = ({ onErrorLoggedIn, onEmail, onLocation }) => {

    const authContext = useContext(AuthContext);
    const history = useHistory();
    const [formState, setFormState] = useState({email: '', password: ''});
    const {path} = useRouteMatch();
    useEffect(() => {
        onLocation(path)
    }, []);


    const handleChange = (evt) => {
        const {value, name} = evt.target;
        setFormState({...formState, [name]: value});
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        authApi.login(formState).then(data => {
            if(data.jwt){
                api.setToken(data.jwt);
                authContext.handleLogin();
                history.push('/');
                onEmail(formState.email);

            }
        }).catch((error) => {
            console.log(error);
            onErrorLoggedIn();
        })
    }
    return(
        <main className="content">
            <section className="login page__login">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <Input value={formState['email']}
                           id="login-email"
                           name="email"
                           maxLength="24"
                           minLength="6"
                           onChangeHandler={handleChange}
                           type="text"
                           styleModifier="login__input"
                           placeholder="Email"
                    />
                    <Input value={formState['password']}
                           id="login-password"
                           name="password"
                           maxLength="24"
                           minLength="6"
                           onChangeHandler={handleChange}
                           type="password"
                           styleModifier="login__input"
                           placeholder="Пароль"
                    />
                    <SignButton value="Войти" />
                </form>
            </section>
        </main>
    );
}