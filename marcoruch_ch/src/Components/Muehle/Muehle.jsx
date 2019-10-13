import React, { useEffect, useState, useContext } from "react";
import { Form, Loader, Button, List, Icon } from 'semantic-ui-react'
import MuehlePlayerSide from '../MuehlePlayerSide/MuehlePlayerSide';
import { MuehlenProvider } from "../MuehleContext/MuehleContext";
import Swal from 'sweetalert2'
import firebase from './../Firebase/Firebase';
import MuehleGameField from './../MuehleGameField/MuehleGameField'
import axios from 'axios';
import API_HOST from '../../environment'

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
            setGames(fetchedGames);
        }, function(error) {
            console.log("couldn't fetch games", error);
        });
    }

    const rejoinGame = (gameId) => {

        const refGame = firebase.firestore().collection('muehleGames').doc(gameId);

         refGame.onSnapshot(function(doc) {
            setChosenGame(null);
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
        console.log("Creating a game...");
        const db = firebase.firestore();
        let CreateMuehleUrl = `${API_HOST}/api/Muehle/Create`;
        axios.post(CreateMuehleUrl)
        .then((res)=> {
            console.log("Added new searching Game... wait for Opponent");
            setSearchingGame(true);
            // set chosenGame to firstplayer userid
            db.collection("muehleGames").doc(`${user}-`).onSnapshot((doc) => {
                // when it updates for a first time, this it means that a user joined
                // so if it got updated & wasn't deleted, try fetching with the new doc id
                if (doc.exists) {
                    setChosenGame(null);
                    setChosenGame(doc.data())
                    db.collection("muehleGames").doc(`${doc.data().id}`).onSnapshot((doc) => doc.exists ? (setChosenGame(null),setChosenGame(doc.data())) : console.log("Doesnt exist anymore"));
                }
              
            });
        }).catch(function () {
            console.log("Couldnt add Document?");
            setSearchingGame(false);
        })

    }

    const handleGameStoneRemovedFromField = (item) => {
        if (!item) return;
        axios.post(`${API_HOST}/api/Muehle/RemoveStone`, { chosenGame: chosenGame, item: item}).then(res => { console.log(res); });
    }

    const handleGameStoneMovedOnField = (item) => {
        if (!item) return;
        axios.post(`${API_HOST}/api/Muehle/MoveStoneOnBoard`, { chosenGame: chosenGame, item: item}).then(res => { console.log(res); });
    }

    const handleGameStoneSetOnField = (item) => {
        axios.post(`${API_HOST}/api/Muehle/SetStone`, { chosenGame: chosenGame, item: item}).then(res => { console.log(res); });
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
                                                <List.Header>Freies Spiel mit {user.uid === game.playerOne ? game.playerTwoName : game.playerOneName}</List.Header>
                                                <List.Description>
                                                 Zuletzt gespielt am <b>{game.updateDate.toDate().toLocaleString()}</b>
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
                                                <List.Header>Freies Spiel mit {game.playerOneName}</List.Header>
                                                <List.Description> 
                                                    Created on <b>{game.createDate.toDate().toLocaleString()}</b>
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
                            : <MuehleGameField handleGameStoneRemovedFromField={handleGameStoneRemovedFromField} handleGameStoneMovedOnField={handleGameStoneMovedOnField} handleGameStoneSetOnField={handleGameStoneSetOnField} user={user} userName={userName} chosenGame={chosenGame}></MuehleGameField>
            }
        </MuehlenProvider>
    )
}

export default Muehle;