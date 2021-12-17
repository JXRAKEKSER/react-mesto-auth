import React, {useContext, useState} from "react";
import {Input} from "./Input";
import {SignButton} from "./SignButton";
import * as authApi from '../utils/authApi';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
export const Login = ({ onErrorLoggedIn, onEmail }) => {

    const authContext = useContext(AuthContext);
    const [formState, setFormState] = useState({email: '', password: ''});
    const history = useHistory();

    const handleChange = (evt) => {
        const {value, name} = evt.target;
        setFormState({...formState, [name]: value});
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        authApi.login(formState).then(data => {
            if(data.token){
                authContext.handleLogin();
                history.push('/');
                authApi.getUserCredentials(data.token).then( ({email, _id}) => {
                    onEmail(email);
                })
            }
        }).catch(() => {
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