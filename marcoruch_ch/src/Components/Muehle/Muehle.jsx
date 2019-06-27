import React, { useEffect, useState, useContext } from "react";
import { Form, Loader, Button, List, Icon } from 'semantic-ui-react'
import MuehlePlayerSide from '../MuehlePlayerSide/MuehlePlayerSide';
import { MuehlenProvider } from "../MuehleContext/MuehleContext";
import Swal from 'sweetalert2'
import firebase from './../Firebase/Firebase';
import MuehleGameField from './../MuehleGameField/MuehleGameField'
import "./Muehle.scss";
        



function Muehle() {

    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("Anonymer User");
    const [games, setGames] = useState(null);
    const [chosenGame, setChosenGame] = useState(null);
    const [searchingGame, setSearchingGame] = useState(false)




    firebase.auth().onAuthStateChanged((user) => {
   
        if (user) {
            setUser(user.uid);
            if (!user.isAnonymous) {
                setUserName(user.displayName ? user.displayName : user.email);
            } else {
                setUserName("Anonymer User");
            }
        } else {
            firebase.auth().signInAnonymously()
        }
    })


    async function fetchGames() {
        firebase.firestore().collection('muehleGames').onSnapshot(function(querySnapshot) {
            const fetchedGames = [];
                    querySnapshot.forEach(function(doc) {
                    fetchedGames.push(doc.data());
            });
            console.log(fetchedGames);
            setGames(fetchedGames);
        }, function(error) {
            console.log("couldn't fetch games", error);
        });
    }

    const rejoinGame = (gameId) => {

        const refGame = firebase.firestore().collection('muehleGames').doc(gameId);

         refGame.onSnapshot(function(doc) {
            setChosenGame(null);
            console.log("Current data: ", doc.data());
            setChosenGame(doc.data());
        });
        
        
    }

    const joinExistingGame = async (gameId) => {
        var currentGame = null;

        let oldRefGame = firebase.firestore().collection('muehleGames').doc(gameId);

        oldRefGame.update(
            {
                id: `${gameId}${user}`,
                playerTwo: user,
                playerTwoLeftStones:9,
                playerSearching: false,
                playerTwoName: userName,
            })
        .then(async function() {
            console.log("Game successfully updated!");
            
            await oldRefGame.get().then(async function (doc) {
                currentGame = doc.data();
                await firebase.firestore().collection("muehleGames").doc(`${gameId}${user}`).set(currentGame);
                oldRefGame.delete();
            });


            firebase.firestore().collection("muehleGames").doc(`${gameId}${user}`).onSnapshot(function(doc) {
                currentGame = doc.data();
                setChosenGame(null);
                setChosenGame(currentGame);
            });
            
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating Game: ", error);
        });

        
    }

    
    const createGameRoom = async () => {
        if (games.filter(game => game.id === `${user}-`).length > 0) {
            console.log("Game already exists...");
            setSearchingGame(true);
            return;
        }

        console.log("Creating a game");

        const db = firebase.firestore();

        let basicGameField = 
        [
            1, 0, 0, 2, 0, 0, 3,
            0, 9, 0, 10, 0, 11, 0,
            0, 0, 17, 18, 19, 0, 0,
            4, 12, 20, 0, 21, 13, 5,
            0, 0, 22, 23, 24, 0, 0,
            0, 14, 0, 15, 0, 16, 0,
            6, 0, 0, 7, 0, 0, 8
        ]
        .map(function(dotNumber, arrIndex){
            return {
                id: arrIndex, isDot: dotNumber >= 1, associatedDotId: dotNumber, isAvailable: dotNumber >= 1 
            }
        });
        db.collection("muehleGames").doc(`${user}-`).set({
            id: `${user}-`,
            playerOne: user,
            playerSearching: true,
            createDate: new Date(),
            finished: false,
            playerOneName: userName,
            gameField: basicGameField,
            playerOneLeftStones: 9,
            currentPlayer:  Math.round(1 + Math.random() * (2 - 1)),
        }).then(function () {
            console.log("Added new searching Game... wait for Opponent");
            setSearchingGame(true);
            // set chosenGame to firstplayer userid
            db.collection("muehleGames").doc(`${user}-`).onSnapshot((doc) => {
                // when it updates for a first time, this it means that a user joined
                // so if it got updated & wasn't deleted, try fetching with the new doc id
                if (doc.exists) {
                    setChosenGame(doc.data())
                    db.collection("muehleGames").doc(`${doc.data().id}`).onSnapshot((doc) => doc.exists ? (setChosenGame(null),setChosenGame(doc.data())) : console.log("Doesnt exist anymore"));
                }
              
            });
        

        }).catch(function () {
            console.log("Couldnt add Document?");
            setSearchingGame(false);
        })

    }



    const handleGameStoneSetOnField = (item) => {
        let newField = [...chosenGame.gameField];

        let oldRefGame = firebase.firestore().collection('muehleGames').doc(chosenGame.id);
        if (item.draggedFrom.color === "black" && chosenGame.currentPlayer === 2) {
            for (const key in newField) {
                if (newField.hasOwnProperty(key)) {
                    const element = newField[key];
                    if (element.isDot && element.associatedDotId === item.dragTo && element.isAvailable) {
                        newField[key].isAvailable = false;
                        newField[key].isWhite = false;
                        newField[key].isBlack = true;
                        oldRefGame.update({
                            gameField: newField,
                            currentPlayer: 1,
                            playerTwoLeftStones: chosenGame.playerTwoLeftStones - 1,
                        }).then(async function () {
                            console.log("Game successfully updated!");
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating Game: ", error);
                        });
                        return;
                    }
                }
            }

        } else if (item.draggedFrom.color === "white" && chosenGame.currentPlayer === 1) {

            for (const key in newField) {
                if (newField.hasOwnProperty(key)) {
                    const element = newField[key];
                    if (element.isDot && (element.associatedDotId === item.dragTo) && element.isAvailable) {
                        newField[key].isAvailable = false;
                        newField[key].isWhite = true;
                        newField[key].isBlack = false;
                        oldRefGame.update({
                            gameField: newField,
                            currentPlayer: 2,
                            playerOneLeftStones: chosenGame.playerOneLeftStones - 1,
                        }).then(async function () {
                            console.log("Game successfully updated!");
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating Game: ", error);
                        });
                        return;
                    }
                }
            }
        } else {
            console.log("Error, player not recognized...");
            return;
        }


    }

    useEffect(() => {
         fetchGames();
    }, []);

    return (
        <MuehlenProvider>
            {
                games == null
                    ? <div className="gameLoader">
                        <h1>Offene Spiele werden geladen...</h1>
                        <Loader active inline='centered' />
                    </div>
                    : searchingGame && (chosenGame == null || chosenGame.playerSearching)
                        ? <div className="gameSearcher">
                            <Loader active inline='centered' />
                            <h1>Auf Gegner warten...</h1>
                            <Button onClick={() => setSearchingGame(false)}>Abbrechen</Button>
                        </div>
                        : chosenGame == null
                            ? <div className="gameChooser">

                                <h1>Meine laufenden Spiele</h1>

                                {games.filter(game => !game.playerSearching && (game.playerOne === user || game.playerTwo === user)).length > 0 ?
                                <List>
                                    {games.filter(game => !game.playerSearching && (game.playerOne === user || game.playerTwo === user)).map(game =>
                                        <List.Item className="game-item" key={game.id}>
                                            <Icon name='game' size='big' />
                                            <List.Content>
                                                <List.Header>Freies Spiel mit {game.userName}</List.Header>
                                                <List.Description>
                                                    Created on {' '}
                                                    <a>
                                                        <b>{game.createDate.toDate().toLocaleString()}</b>
                                                    </a>{' '}.
                                                </List.Description>
                                            </List.Content>
                                            <List.Content floated='right'>
                                                <Button onClick={() => rejoinGame(game.id)}>Rejoin Game</Button>
                                            </List.Content>
                                        </List.Item>)}
                                </List>
                                : <div>Momentan sind keine laufenden Spiele von Ihnen vorhanden.</div>
                                }<br></br>

                                
                                <h1>Wartende Gegner</h1>
                                {games.filter(game => game.playerSearching &&  game.playerOne !== user).length > 0?
                                <List>
                                    {games.filter(game => game.playerSearching &&  game.playerOne !== user).map(game =>
                                        <List.Item className="game-item" key={game.id}>
                                            <Icon name='game' size='big' />
                                            <List.Content>
                                                <List.Header>Freies Spiel mit {game.userName}</List.Header>
                                                <List.Description>
                                                    Created on {' '}
                                                    <a>
                                                        <b>{game.createDate.toDate().toLocaleString()}</b>
                                                    </a>{' '}.
                                                </List.Description>
                                            </List.Content>
                                            <List.Content floated='right'>
                                                <Button onClick={() => joinExistingGame(game.id)}>Join Game</Button>
                                            </List.Content>
                                        </List.Item>)}
                                </List>
                                : <div>Momentan befinden sich keine Gegner in der Warteschleife...</div>}
                                <br></br>
                                <Form.Button onClick={() => createGameRoom()} >Neuen Spielraum erstellen</Form.Button>

                            </div>
                            : <MuehleGameField handleGameStoneSetOnField={handleGameStoneSetOnField} user={user} userName={userName} chosenGame={chosenGame}></MuehleGameField>
            }
        </MuehlenProvider>
    )
}

export default Muehle;