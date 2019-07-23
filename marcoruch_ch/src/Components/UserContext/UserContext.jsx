import React, { useState, createContext } from "react";
import firebase from './../Firebase/Firebase';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = props => {

    const [User, SetUser] = useState(null);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            SetUser(user);
            user.getIdToken().then((idToken) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
            }).catch(() => axios.defaults.headers.common['Authorization'] = null);
        } else {
            UserLoggedOut();
        }
    });

   
    const UserLoggedOut = () => {
        SetUser(null);
        delete axios.defaults.headers.common['Authorization'];
    }

    return (
        <UserContext.Provider value={
            [
                User, SetUser,
                UserLoggedOut
            ]}>
            {props.children}
        </UserContext.Provider>
    );
};
