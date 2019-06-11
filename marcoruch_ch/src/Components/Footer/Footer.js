import React, { useState } from "react";
import './Footer.scss';


import firebase from './../Firebase/Firebase';


function Footer() {

   

    return (
        <footer className="App-footer">
          
    <div>
    <a href="https://de.freepik.com/fotos-vektoren-kostenlos/design">Design Vektor erstellt von freepik - de.freepik.com</a>
    <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>
    <a href="https://de.freepik.com/fotos-vektoren-kostenlos/reise">Reise Vektor erstellt von rawpixel.com - de.freepik.com</a>

    </div>
        </footer>
    );
}


export default Footer;