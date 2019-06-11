import React, {useState } from "react";
import './LoginNav.scss';
import LoginModal from './../LoginModal/LoginModal';

function LoginNav() {

    const [showModal, setShowModal] = useState(false);
  
    function handleLogin() {
            setShowModal(!showModal);
    }

    return (
        <React.Fragment> 
            <a href="#login"   onClick={handleLogin}>Login</a>

        {showModal
        ? <LoginModal></LoginModal>
        : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
  }


  export default LoginNav;