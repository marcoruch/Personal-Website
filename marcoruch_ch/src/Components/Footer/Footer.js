import React from "react";
import './Footer.scss';
import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer className="App-footer">

            <div className="footer-top">
                <p >Meine Projekte, Erfahrungen & Tasks</p>
            </div>
            <div className="footer-mid">
                <p class="login-info">Einige Inhalte sind nur für Authorisierte Logins verfügbar - bitte für Informationen per <Link to="/contact">Kontaktformular</Link> oder <a href="mailto:marco_ruch@gmx.ch">E-Mail</a> melden.</p>
            </div>
            <div className="footer-bottom">
                <div className="contact">
                    <h5>Kontaktinformationen</h5>
                    <a href="tel:+41765850641">Tel.: 076 585 06 41</a>
                    <a href="mailto:marco_ruch@gmx.ch">E-Mail: marco_ruch@gmx.ch</a>
                </div>
                <div className="references">
                    <h5>Fremdinhalte</h5>
                    <a href="https://de.freepik.com/fotos-vektoren-kostenlos/design">Design Vektor erstellt von freepik - de.freepik.com</a>
                    <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>
                    <a href="https://de.freepik.com/fotos-vektoren-kostenlos/reise">Reise Vektor erstellt von rawpixel.com - de.freepik.com</a>
                    <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by rawpixel.com - www.freepik.com</a>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

                </div>
            </div>
        </footer>
    );
}


export default Footer;