import React, { useState } from "react";
import LoginNav from "./../LoginNav/LoginNav";
import UserControlPanelNav from './../UserControlPanelNav/UserControlPanelNav';
import { Link } from "react-router-dom";
import './Header.scss';


import firebase from './../Firebase/Firebase';


function Header() {
    const [user, setUser] = useState(null);
    const [hamburger, setHamburger] = useState(false);

    const login = {
        width:'400px',
        color: 'white',
        float:'right',
        marginLeft: 'auto'
    }

    const hamburgerMenuStyle = {
        display: hamburger ? "block" : "none",
    }

    
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    return (
        <header className="App-header">
            <div className="large">
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
                <li style={login}>
                    {user ? <UserControlPanelNav /> : <LoginNav />}
                </li>
    </ul> </div>
    <div className="medium">
            <div  id="hamburger-holder" onClick={()=>setHamburger(!hamburger)}>
                <div class="hamburger"></div>
                <div class="hamburger"></div>
                <div class="hamburger"></div>
            </div>
            <ul style={hamburgerMenuStyle}>
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
                <li >
                    {user ? <UserControlPanelNav /> : <LoginNav />}
                </li>
    </ul> </div>
        </header>
    );
}


export default Header;