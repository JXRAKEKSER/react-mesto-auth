import React, {useState} from "react";
import {Input} from "./Input";
import {SignButton} from "./SignButton";
import {Link} from 'react-router-dom'
import * as authApi from '../utils/authApi';
export const Register = ({onSuccessfullReg, onErrorReg}) => {
    const [formState, setFormState] = useState({email: '', password: ''});
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormState({...formState, [name]: value});
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        authApi.authentication(formState).then(data => {

            onSuccessfullReg();
        }).catch(() => {
            onErrorReg();
        })
    }

    return(
        <main className="content">
            <section className="register page__register">
                <h2 className="register__title">Регистрация</h2>
                <form className="register__form" onSubmit={handleSubmit}>
                    <Input value={formState['email']}
                           name="email"
                           id="register-email"
                           maxLength="100"
                           minLength="6"
                           onChangeHandler={handleChange}
                           type="text"
                           styleModifier="register__input"
                           placeholder="Email"
                    />
                    <Input value={formState['password']}
                           id="register-password"
                           name="password"
                           maxLength="24"
                           minLength="6"
                           onChangeHandler={handleChange}
                           type="password"
                           styleModifier="register__input"
                           placeholder="Пароль"
                    />
                    <SignButton value="Зарегестрироваться" />
                </form>
                    <p className="register__sign-in-caption">Уже зарегистрированы? {<Link to="../sign-in" className="register__sign-in-link">Войти</Link>}</p>
            </section>
        </main>
    );
}