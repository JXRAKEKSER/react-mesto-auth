import React, {useContext} from "react";
import {Route, Redirect, useRouteMatch} from 'react-router-dom'
import {AuthContext} from "../contexts/AuthContext";
export const ProtectedRoute = ({component: Component, ...props}) => {
    const authContext = useContext(AuthContext);



    return(
        <Route >
            {() =>  authContext.isLoggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />}</Route>
    );

}