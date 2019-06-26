import React, { useState } from "react";
import LoginNav from "./../LoginNav/LoginNav";
import Backdrop from "./../Backdrop/Backdrop";
import UserControlPanelNav from './../UserControlPanelNav/UserControlPanelNav';
import { Link } from "react-router-dom";
import Back from './../GoBack/GoBack'
import './Header.scss';


import firebase from './../Firebase/Firebase';


function Header() {
    const [user, setUser] = useState(null);
    const [hamburger, setHamburger] = useState(false);

    const login = {
        width:'400px',
        color: 'white',
        float:'right',
        marginLeft: 'auto',   
         display: "flex" ,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }

    const hamburgerMenuStyle = {
        display: hamburger ? "flex" : "none",
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }

    
    firebase.auth().onAuthStateChanged((user) => {
        
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    const handleBackDropClicked = () =>{
        setHamburger(!hamburger);
    }

    return (
        <header className="App-header">
            <div className="large">
            <ul>
                
            <li>
                <Back />
                </li>
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
                <div className="hamburger"></div>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
            </div>
            { hamburger ? <Backdrop click={handleBackDropClicked}></Backdrop>  : <React.Fragment></React.Fragment>}
            <ul style={hamburgerMenuStyle}>
            <div  id="hamburger-in-nav-holder" onClick={()=>setHamburger(!hamburger)}>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
            </div>
            <li>
                
                </li>
                <li>
                    <Link to="/" onClick={() => setHamburger(!hamburger)}>Home</Link>
                </li>
            <li>
                 <Link to="/projects" onClick={() => setHamburger(!hamburger)}>Projects</Link>
                </li>
                <li>
                    <Link to="/skills" onClick={() => setHamburger(!hamburger)}>Skills</Link>
                </li>
                <li>
                    <Link to="/games" onClick={() => setHamburger(!hamburger)}>Games</Link>
                </li>
                <li>
                    <Link to="/blog" onClick={() => setHamburger(!hamburger)}>Blog</Link>
                </li>
                <li>
                    <Link to="/contact" onClick={() => setHamburger(!hamburger)}>Contact</Link>
                </li>
                <li >
                    {user ? <UserControlPanelNav /> : <LoginNav />}
                </li>
    </ul> </div>
        </header>
    );
}


export default Header;