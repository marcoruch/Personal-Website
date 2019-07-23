import React, {useState } from "react";
import './LoginModal.scss';
import firebase from './../Firebase/Firebase';
import Swal from 'sweetalert2'
import Backdrop from './../Backdrop/Backdrop';


import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
} from 'semantic-ui-react';


function LoginModal() {

    // login hooks
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userLogin, setUserLoginModal] = useState(true);
    const [shouldHide, setShouldHide] = useState(false);
    


    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }


    // create user hooks
    const [createEmail, setCreateEmail] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [createCheckPassword, setCheckCreatePassword] = useState("");


    function handleCreateEmailChange(e){
        setCreateEmail(e.target.value);
    }

    function handleCreatePasswordChange(e){
        setCreatePassword(e.target.value);
    }
    function handleCheckCreatePasswordChange(e){
        setCheckCreatePassword(e.target.value);
    }


    function handleBackDropClicked(){
        setShouldHide(!shouldHide);
    }

    // modal funcs
    function handleModalToggle(){
        setUserLoginModal(!userLogin);
    }


     const createEmailPasswordFirebaseUser = () =>{

        if (createPassword === createCheckPassword) {
            firebase.auth().createUserWithEmailAndPassword(createEmail, createPassword).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                Swal.fire('Ups...', `Etwas ist schiefgelaufen:
                ${errorMessage}`, 'error')
                console.log(errorCode,errorMessage);
            })
            .then(function(user){
                firebase.auth().signInWithEmailAndPassword(createEmail, createPassword).then(function(user){
                    Swal.fire('Hallo!', `Erfolgreich registriert und angemeldet.`, 'success');
                    setShouldHide(true);
                });
            });
        }
        
    }

    const signInEmailPasswordToFirebase = () =>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage);
        })
        .then(function(user){
            console.log(user);
            if (user !== null && typeof user !== "undefined"){

                Swal.fire('Hallo!', `Erfolgreich angemeldet.`, 'success');
                setShouldHide(true);
            } else {
                Swal.fire('Fehler!', `E-Mail oder Passwort falsch.`, 'error');
            }
        });
    }

    return (
        <div>
         {shouldHide ? <div></div> :   
          <React.Fragment>
          <Backdrop click={handleBackDropClicked}></Backdrop> 
        {userLogin
        ?
        <div className="login-modal">
            <Grid centered columns={1}>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Login</Header>
                    <Segment>
                        <Form size="large">
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Email Adresse"
                                onChange={handleEmailChange}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Passwort"
                                type="password"
                                onChange={handlePasswordChange}
                            />
                            <Button  fluid size="large" onClick={signInEmailPasswordToFirebase}>Login</Button>
                        </Form>
                    </Segment>
                    <Message>
                        <a href="#register" onClick={handleModalToggle}>Jetzt Registrieren</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </div> 
        : <div className="register-modal">
        <Grid centered columns={1}>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Registrierung</Header>
                    <Segment>
                        <Form size="large">
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Email Adresse"
                                onChange={handleCreateEmailChange}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Passwort"
                                type="password"
                                onChange={handleCreatePasswordChange}
                            />
                               <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Passwort bestätigen"
                                type="password"
                                onChange={handleCheckCreatePasswordChange}
                            />
                            <Button  fluid size="large" onClick={createEmailPasswordFirebaseUser}>Registrieren</Button>
                        </Form>
                    </Segment>
                    <Message>
                        <a href="#login" onClick={handleModalToggle}>Zurück zum Login</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </div> }</React.Fragment>
        } </div>
    );
}


export default LoginModal;