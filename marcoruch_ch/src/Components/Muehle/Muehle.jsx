import React, { useEffect, useState, useContext } from "react";
import { Form, Loader, Button, List, Icon } from 'semantic-ui-react'
import MuehlePlayerSide from '../MuehlePlayerSide/MuehlePlayerSide';
import { MuehlenProvider } from "../MuehleContext/MuehleContext";
import Swal from 'sweetalert2'
import firebase from './../Firebase/Firebase';
import MuehleGameField from './../MuehleGameField/MuehleGameField'
import "./Muehle.scss";



var index=-1;

        



function Muehle() {

    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("Anonymer User");
    const [games, setGames] = useState(null);
    const [chosenGame, setChosenGame] = useState(null);
    const [searchingGame, setSearchingGame] = useState(false)


    const getBasicGameField = () => {
        return [
                    [1, 0, 0, 1, 0, 0, 1],
                    [0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 1, 1, 1, 0, 0],
                    [1, 1, 1, 0, 1, 1, 1],
                    [0, 0, 1, 1, 1, 0, 0],
                    [0, 1, 0, 1, 0, 1, 0],
                    [1, 0, 0, 1, 0, 0, 1],
                ].map(function(dotArr, arrIndex){
                        return {id: arrIndex, arrayRow: dotArr.map(function(isDot) 
                        {
                            index++;
                            return { id: index, isDot: isDot === 1, isAvailable: isDot === 1 }
                        })};
                    });
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user.uid);
            if (!user.isAnonymous) {
                setUserName(user.displayName);
            }
        } else {
            firebase.auth().signInAnonymously()
        }
    })


    async function fetchGames() {
        const fetchedGames = [];
        await firebase.firestore().collection('muehleGames').get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    fetchedGames.push(doc.data());
                });
            })
        setGames(fetchedGames);
    }

    const rejoinGame = async (gameId) => {
        var currentGame = null;

        let refGame = firebase.firestore().collection('muehleGames').doc(gameId);

         refGame.onSnapshot(function(doc) {
            currentGame= doc.data(); 
            console.log("Current data: ", currentGame);
            setChosenGame(currentGame);
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
            await oldRefGame.get()
            .then(function (doc) {
                currentGame = doc.data();
            });

            oldRefGame.delete();

            
            await firebase.firestore().collection("muehleGames").doc(`${gameId}${user}`).set(currentGame);

            setChosenGame(currentGame);
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

        db.collection("muehleGames").doc(`${user}-`).set({
            id: `${user}-`,
            playerOne: user,
            playerSearching: true,
            createDate: new Date(),
            finished: false,
            playerOneName: userName,
            gameField: getBasicGameField(),
            playerOneLeftStones: 9,
            currentPlayer:  Math.round(1 + Math.random() * (2 - 1)),
        }).then(function () {
            console.log("Added new searching Game... wait for Opponent");
            setSearchingGame(true);
        }).catch(function () {
            console.log("Couldnt add Document?");
            setSearchingGame(false);
        })

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
                    : searchingGame
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
                            : <MuehleGameField user={user} chosenGame={chosenGame}></MuehleGameField>
            }
        </MuehlenProvider>
    )
}

export default Muehle;