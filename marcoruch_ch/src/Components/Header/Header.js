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
                 <Link to="/projects">Projekte</Link>
                </li>
                <li>
                    <Link to="/skills">Fähigkeiten</Link>
                </li>
                <li>
                    <Link to="/games">Spiele & Aufgaben</Link>
                </li>
                <li>
                    <Link to="/blogs">Blog</Link>
                </li>
                <li>
                    <Link to="/curriculumvitae">CV</Link>
                </li>
                <li>
                    <Link to="/contact">Kontakt</Link>
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
                 <Link to="/projects" onClick={() => setHamburger(!hamburger)}>Projekte</Link>
                </li>
                <li>
                    <Link to="/skills" onClick={() => setHamburger(!hamburger)}>Fähigkeiten</Link>
                </li>
                <li>
                    <Link to="/games" onClick={() => setHamburger(!hamburger)}>Spiele & Aufgaben</Link>
                </li>
                <li>
                    <Link to="/curriculumvitae" onClick={() => setHamburger(!hamburger)}>CV</Link>
                </li>
                <li>
                    <Link to="/contact" onClick={() => setHamburger(!hamburger)}>Kontakt</Link>
                </li>
                <li >
                    {user ? <UserControlPanelNav /> : <LoginNav />}
                </li>
    </ul> </div>
        </header>
    );
}


export default Header;