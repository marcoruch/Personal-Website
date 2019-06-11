import React, { useState } from "react";
import LoginNav from "./../LoginNav/LoginNav";
import UserControlPanelNav from './../UserControlPanelNav/UserControlPanelNav';
import { Link } from "react-router-dom";
import './Header.scss';


import firebase from './../Firebase/Firebase';
const extraWidth = {
    width:'400px',
    color: 'white'
}

function Header() {
    const [user, setUser] = useState(null);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    return (
        <header className="App-header">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            <li>
                 <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/skills">Skills</Link>
                </li>
                <li>
                    <Link to="/games">Games</Link>
                </li>
                <li>
                    <Link to="/blog">Blog</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li style={extraWidth}>
                    {user ? <UserControlPanelNav /> : <LoginNav />}
                </li>
    </ul> 
        </header>
    );
}


export default Header;