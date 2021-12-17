import React, {useContext} from "react";
import {Route, Redirect} from 'react-router-dom'

import Header from "./Header";
import {AuthContext} from "../contexts/AuthContext";
export const ProtectedComponent = ({component: Component, ...props}) => {
    const authContext = useContext(AuthContext);


    return(
        <Route >
            {() =>  authContext.isLoggedIn ? (
                <><Header emailNav={props.emailNav}/>
            <Component {...props} /> </>) : <Redirect to="./sign-in" />}</Route>
    );

}