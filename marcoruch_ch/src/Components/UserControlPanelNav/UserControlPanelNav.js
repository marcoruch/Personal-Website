import React, {useState} from "react";
import UserControlPanelModal from './../UserControlPanelModal/UserControlPanelModal';

import firebase from './../Firebase/Firebase';

function UserControlPanelNav() {

    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);

    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
          setUser(user);
      }
    });



    function handleModalToggle() {
            setShowModal(!showModal);
    }

    return (
      <div>{
        user == null ? <div></div>
      : <React.Fragment> <div   onClick={handleModalToggle}>Welcome, {user.email}</div>
        {showModal
        ? <UserControlPanelModal ></UserControlPanelModal>
        : <React.Fragment></React.Fragment>}
        </React.Fragment>}</div>
    );
  }



export default UserControlPanelNav;