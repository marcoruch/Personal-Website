import React, { useEffect, useState, useContext } from "react";
import { Form, Loader, Button, List, Icon } from 'semantic-ui-react'
import MuehlePlayerSide from '../MuehlePlayerSide/MuehlePlayerSide';
import { MuehlenProvider } from "../MuehleContext/MuehleContext";
import Swal from 'sweetalert2'
import firebase from './../Firebase/Firebase';
import MuehleGameField from './../MuehleGameField/MuehleGameField'
import "./Muehle.scss";
        
const muehlePossibilities = 
[
    [1,2,3],
    [9,10,11],
    [17,18,19],
    [4,12,20],
    [21,13,5],
    [22,23,24],
    [14,15,16],
    [6,7,8],
    [1,4,6],
    [9,12,14],
    [17,20,22],
    [2,10,18],
    [23,15,7],
    [19,21,24],
    [11,13,16],
    [3,5,8]
]

const movePossibilities = [
    [1,2], [1,4], [2,3], [2,10], [3,5], [9,10],
    [9,12],[10,11],[10,18],[11,13], [17,18],[17,20],[18,19],[19,21],
    [4,12],  [4,6],[12,20],[12,14],[20,22],[21,13],[21,24],[13,5],[13,16],
    [5,8], [14,15],[15,7],[15,16],[6,7],[7,8]
]

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

    const arraysEqual = (arr1, arr2) => {
        if(arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i])
                return false;
        }
    
        return true;
    }

    const canStoneMakeMove = (from, to, gameField) => {
        if (movePossibilities.filter(possibility => arraysEqual(possibility,[from,to])).length>0 ||
        movePossibilities.filter(possibility => arraysEqual(possibility,[to,from])).length>0){
           if (gameField.filter(stone => stone.associatedDotId === to && stone.isAvailable).length >0){
                return true;
            }
        }   
        return false;
     }

    const isNewMuehleInGameFieldForColor = (gameField, existingMuehlen, color) => {
        const newExistingMuehlen = [];
        let anyNewMuehle = false;
        for (let possibilityIndex = 0; possibilityIndex < muehlePossibilities.length; possibilityIndex++) {
            const possibility = muehlePossibilities[possibilityIndex];
            
            let isWhiteMuehle = true;
            let isBlackMuehle = true;
            for (let possibilityPartIndex = 0; possibilityPartIndex < possibility.length; possibilityPartIndex++) {
                const possibilityPart = possibility[possibilityPartIndex];
               
                    if (isBlackMuehle) {
                        if (!gameField.filter(item => item.associatedDotId === possibilityPart)[0].isBlack) {
                            isBlackMuehle = false;
                        }
                    }
                    
                    if (isWhiteMuehle) {
                        if (!gameField.filter(item => item.associatedDotId === possibilityPart)[0].isWhite) {
                            isWhiteMuehle = false;
                        }
                    }
            }

            if ((isBlackMuehle && color === 'black') || (isWhiteMuehle && color === 'white')){
                // if is not a new muhle
                 if (existingMuehlen && existingMuehlen.filter(existingMuehle =>arraysEqual(existingMuehle.possibility,possibility)).length >0) {
                    newExistingMuehlen.push(possibility);
                } else {
                    anyNewMuehle = true;
                    newExistingMuehlen.push(possibility);
                }
              
            }

            if ((isBlackMuehle && color !== 'black') || (isWhiteMuehle && color !== 'white')){
                    newExistingMuehlen.push(possibility);
            }
        }
        if (anyNewMuehle){
            return {isMuehle: true,  existingMuehlen: newExistingMuehlen.map((item, index) => { return {id: index, possibility: item}})};
        } else {
            return {isMuehle: false,  existingMuehlen: newExistingMuehlen.map((item, index) => { return {id: index, possibility: item}})};
        }
    }

    const isThereRemovableStone = (color, field, existingMuehlen) => {
        if (!existingMuehlen) {
            return true;
        } 
        
        const muehlePoints = [];
        for (let muehlePossibilitiesIndex = 0; muehlePossibilitiesIndex < existingMuehlen.length; muehlePossibilitiesIndex++) {
            muehlePoints.push(existingMuehlen[muehlePossibilitiesIndex].possibility[0]);
            muehlePoints.push(existingMuehlen[muehlePossibilitiesIndex].possibility[1]);
            muehlePoints.push(existingMuehlen[muehlePossibilitiesIndex].possibility[2]);
        }

        const colorStones = field.filter(stone => (color === "black" && stone.isBlack) || (color === "white" && stone.isWhite)).map(stone => stone.associatedDotId);

        for (let stoneIndex = 0; stoneIndex < colorStones.length; stoneIndex++) {
            if  (!muehlePoints.includes(colorStones[stoneIndex])){
                return true;
            }
        }
        return false;
    }

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
        let oldRefGame = firebase.firestore().collection('muehleGames').doc(chosenGame.id);

        for (let index = 0; index < chosenGame.existingMuehlen.length; index++) {
            const element = chosenGame.existingMuehlen[index];
            if (element.possibility.includes(item.gameStone.associatedDotId)) {
                return;
            }
        }
        let newField = [...chosenGame.gameField];
        for (let index = 0; index < newField.length; index++) {
            if (newField[index].associatedDotId === item.gameStone.associatedDotId) {
                newField[index].isWhite = false;
                newField[index].isBlack = false;
                newField[index].isAvailable = true;
            }
        }
        oldRefGame.update({
            playerHasMuehle: false,
            gameField: newField,
            currentPlayer: chosenGame.currentPlayer === 1 ? 2 : 1,
        }).then(async function () {
            console.log("Game successfully updated!");
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating Game: ", error);
        });
    }

    const handleGameStoneMovedOnField = (item) => {
        let newField = [...chosenGame.gameField];
        let movePossible = canStoneMakeMove(item.draggedFrom.gameStone.associatedDotId, item.dragTo, newField);
      
        if (movePossible) {
            let oldRefGame = firebase.firestore().collection('muehleGames').doc(chosenGame.id);
            if (chosenGame.currentPlayer === 1){
                for (let index = 0; index < newField.length; index++) {
                    if (newField[index].associatedDotId === item.draggedFrom.gameStone.associatedDotId) {
                        newField[index].isWhite = false;
                        newField[index].isBlack = false;
                        newField[index].isAvailable = true;
                    }
                    if (newField[index].associatedDotId === item.dragTo) {
                        newField[index].isWhite = true;
                        newField[index].isBlack = false;
                        newField[index].isAvailable = false;
                    }
                }
                let muehlenCheckResult = isNewMuehleInGameFieldForColor(newField, chosenGame.existingMuehlen, 'white');
                        if (muehlenCheckResult.isMuehle){
                            if (!isThereRemovableStone('black', newField, chosenGame.existingMuehlen)) {
                                muehlenCheckResult.isMuehle = false;
                            }
                        }
                        oldRefGame.update({
                            playerHasMuehle: muehlenCheckResult.isMuehle,
                            gameField: newField,
                            currentPlayer: muehlenCheckResult.isMuehle ? 1 : 2,
                            existingMuehlen: muehlenCheckResult.existingMuehlen,
                        }).then(async function () {
                            console.log("Game successfully updated!");
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating Game: ", error);
                        });
            } else if (chosenGame.currentPlayer ===2){
                for (let index = 0; index < newField.length; index++) {
                    if (newField[index].associatedDotId === item.draggedFrom.associatedDotId) {
                        newField[index].isWhite = false;
                        newField[index].isBlack = false;
                        newField[index].isAvailable = true;
                    }
                    if (newField[index].associatedDotId === item.dragTo) {
                        newField[index].isWhite = false;
                        newField[index].isBlack = true;
                        newField[index].isAvailable = false;
                    }
                }
                let muehlenCheckResult = isNewMuehleInGameFieldForColor(newField, chosenGame.existingMuehlen, 'black');
                        if (muehlenCheckResult.isMuehle){
                            if (!isThereRemovableStone('white', newField, chosenGame.existingMuehlen)) {
                                muehlenCheckResult.isMuehle = false;
                            }
                        }
                        oldRefGame.update({
                            playerHasMuehle: muehlenCheckResult.isMuehle,
                            gameField: newField,
                            currentPlayer: muehlenCheckResult.isMuehle ? 2 : 1,
                            existingMuehlen: muehlenCheckResult.existingMuehlen,
                        }).then(async function () {
                            console.log("Game successfully updated!");
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating Game: ", error);
                        });
            } else {
                // something went wrong
                console.log("Player not recognized");
            }
        }
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
                        
                        let muehlenCheckResult = isNewMuehleInGameFieldForColor(newField, chosenGame.existingMuehlen, 'black');
                        if (muehlenCheckResult.isMuehle){
                            if (!isThereRemovableStone('white', newField, chosenGame.existingMuehlen)) {
                                muehlenCheckResult.isMuehle = false;
                            }
                        }
                        oldRefGame.update({
                            playerHasMuehle: muehlenCheckResult.isMuehle,
                            gameField: newField,
                            currentPlayer: muehlenCheckResult.isMuehle ? 2 : 1,
                            existingMuehlen: muehlenCheckResult.existingMuehlen,
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
                        let muehlenCheckResult = isNewMuehleInGameFieldForColor(newField, chosenGame.existingMuehlen, 'white');
                        if (muehlenCheckResult.isMuehle){
                            if (!isThereRemovableStone('black', newField, chosenGame.existingMuehlen)) {
                                muehlenCheckResult.isMuehle = false;
                            }
                        }
                        oldRefGame.update({
                            playerHasMuehle: muehlenCheckResult.isMuehle,
                            gameField: newField,
                            currentPlayer: muehlenCheckResult.isMuehle ? 1 : 2,
                            existingMuehlen: muehlenCheckResult.existingMuehlen,
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
                            : <MuehleGameField handleGameStoneRemovedFromField={handleGameStoneRemovedFromField} handleGameStoneMovedOnField={handleGameStoneMovedOnField} handleGameStoneSetOnField={handleGameStoneSetOnField} user={user} userName={userName} chosenGame={chosenGame}></MuehleGameField>
            }
        </MuehlenProvider>
    )
}

export default Muehle;