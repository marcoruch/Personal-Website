import React, { useState, useContext } from "react";
import firebase from './../Firebase/Firebase';
import Backdrop from './../Backdrop/Backdrop';
import { UserContext } from '../UserContext/UserContext'
import './UserControlPanelModal.scss';


function UserControlPanelModal() {

    const [User, UserLoggedOut] = useContext(UserContext)
    const [shouldHide, setShouldHide] = useState(false);

    function handleBackDropClicked() {
        setShouldHide(!shouldHide);
    }



    const handleLogOut = () => {
        firebase.auth().signOut().then(() => UserLoggedOut());
    }

    return (
        User == null || shouldHide
            ? <div></div>
            : <React.Fragment>
                <Backdrop click={handleBackDropClicked}></Backdrop>
                <div className="usercontrolpanel-modal">
                    <div className="ui inverted segment">
                        <div className="ui inverted relaxed divided list">
                            <div className="item">
                                <div className="content">
                                    <div className="header">{User.email}</div>
                                    <div>Profil</div>
                                    <div onClick={handleLogOut}>Ausloggen</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </React.Fragment>

    );
}

export default UserControlPanelModal;