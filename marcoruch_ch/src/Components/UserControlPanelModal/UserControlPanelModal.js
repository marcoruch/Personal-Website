import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from './../Firebase/Firebase';
import Backdrop from './../Backdrop/Backdrop';
import './UserControlPanelModal.scss';


import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
} from 'semantic-ui-react';


function UserControlPanelModal() {



    const [userBlogs, setUserBlogs] = useState(null);
    const [user, setUser] = useState(null);
    const [shouldHide, setShouldHide] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
        if (user) {
            const userUid = user.uid;

            firebase.firestore()
                .collection(userUid)
                .get()
                .then(function (snapshot) {
                    let blogs = snapshot.docs.map(doc => doc.data());
                    setUserBlogs(blogs);
                });
        } else {

        }
    });

    function handleBackDropClicked() {
        setShouldHide(!shouldHide);
    }



    const handleLogOut = () => {
        firebase.auth().signOut().then(function () {
            setUser(null);
        }, function (error) {
            // An error happened.
            console.log(error);
        });
    }

    return (
        user == null || shouldHide
            ? <div></div>
            : <React.Fragment>
                
                <Backdrop click={handleBackDropClicked}></Backdrop>
                <div className="usercontrolpanel-modal">
                    <div class="ui inverted segment">
                        <div class="ui inverted relaxed divided list">
                            <div class="item">
                                <div class="content">
                                    <div class="header">{user.email}</div>
                                    <div>Profil</div>
                                    <div onClick={handleLogOut}>Ausloggen</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="content">
                                    <div class="header">Blogs ({userBlogs ? userBlogs.length : 0})</div>
                                    <hr></hr>
                                    <Link to="/overviewBlog">
                                        <Button fluid size="large" onClick={handleBackDropClicked}>
                                            <p>Meine Blogs</p>
                                        </Button>
                                    </Link>
                                    <br></br>
                                    <Link to="/createblog">
                                        <Button fluid size="large" onClick={handleBackDropClicked}>
                                            <p>Blogeintrag hinzufügen</p>
                                        </Button>
                                    </Link>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </React.Fragment>

    );
}

export default UserControlPanelModal;