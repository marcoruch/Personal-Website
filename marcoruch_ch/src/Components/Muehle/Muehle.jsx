import React, { useEffect, useState, useContext } from "react";
import { Form, Loader, Button, List, Icon  } from 'semantic-ui-react'
import MuehlePlayerSide from '../MuehlePlayerSide/MuehlePlayerSide';
import { MuehlenProvider } from "../MuehleContext/MuehleContext";
import Swal from 'sweetalert2'
import firebase from './../Firebase/Firebase';
import "./Muehle.scss";

const dots = [1,2,3,4,5,6,7,8]

const dots_matrix =
[
    [1,0,0,1,0,0,1],
    [0,1,0,1,0,1,0],
    [0,0,1,1,1,0,0],
    [1,1,1,0,1,1,1],
    [0,0,1,1,1,0,0],
    [0,1,0,1,0,1,0],
    [1,0,0,1,0,0,1],
]

function Muehle() {

    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("Anonymer User");
    const [games, setGames] = useState(null);
    const [chosenGame, setChosenGame] = useState(null);
    const [searchingGame, setSearchingGame] = useState(false)

        
    firebase.auth().onAuthStateChanged((user)=> {
        if (user){
            setUser(user.uid);
            if (!user.isAnonymous){
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

    const getExistingGame = async (gameId) => {
      
        var currentGame = null;
        await firebase.firestore().collection('muehleGames').doc(gameId).get()
            .then(function (doc) {
                currentGame = doc.data();
            });
        setChosenGame(currentGame);
    } 
    const createOrJoinGame = async () => {
        if (games && games.length > 0 && games.filter(game => game.playerSearching && game.playerOne !== user && !game.finished).length > 0){
            console.log("Game found...");
        } else {
            console.log("Creating a game");

            if (games.filter(game => game.id === `${user}-`).length > 0)
            {
                console.log("Game already exists...");
                setSearchingGame(true);
                return;
            }

            const db = firebase.firestore();

            db.collection("muehleGames").doc(`${user}-`).set({
                id: `${user}-`,
                playerOne: user,
                playerSearching: true,
                createDate: new Date(),
                finished: false,
                userName: userName,
            }).then(function() {
               console.log("Added new searching Game... wait for Opponent");
               setSearchingGame(true);
            }).catch(function() {
                console.log("Couldnt add Document?");
                setSearchingGame(false);
            })
            
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
            : searchingGame
            ? <div className="gameSearcher">
                <Loader active inline='centered' />
                <h1>Auf Gegner warten...</h1>
            </div>
            : chosenGame == null
            ? <div className="gameChooser">
                <h1>Wartende Gegner</h1>
                <List>
                {games.map(game=> 
                  <List.Item className="game-item">
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
                        <Button onClick={() => getExistingGame(game.id)}>Join Game</Button>
                    </List.Content>
                  </List.Item>)}
                </List>
                  <br></br>
                <Form.Button floated='centered' enabled={user !== null} onClick={() => createOrJoinGame()} >Neuen Spielraum erstellen</Form.Button>

            </div>
            : <div className="muehle">
                <div className="header">
                    <h1>Spiel: Mühle</h1>
                    <p>
                        Klassisches Mühle Brettspiel. Ziehen sie per Drag-Drop die Spielsteine auf das Spielfeld - Viel Spass!
                    </p>
                </div>
                
                <MuehlePlayerSide player={1}></MuehlePlayerSide>
                <div className="muehle-game">
                    <div className="outer-field">
                    {dots.map(i => <div className="dot" draggable></div>) }
                        <div className="middle-field">
                    {dots.map(i => <div className="dot" draggable></div>) }
                            <div className="center-field">
                    {dots.map(i => <div className="dot" draggable></div>) }
                            </div>
                        </div>
                    </div>
                </div>
                <MuehlePlayerSide player={2}></MuehlePlayerSide>
            </div>
        }
        </MuehlenProvider>
    )
}

export default Muehle;