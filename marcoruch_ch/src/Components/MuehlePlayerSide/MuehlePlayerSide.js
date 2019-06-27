import React, { useEffect, useContext } from "react";
import { Button } from 'semantic-ui-react'
import { MuehlenContext } from '../MuehleContext/MuehleContext'
import MuehleStone from '../MuehleStone/MuehleStone'
import Swal from 'sweetalert2'
import firebase from './../Firebase/Firebase';
import "./MuehlePlayerSide.scss"
function MuehlePlayerSide(props) {

    const [
        PlayerOneStones,
        setPlayerOneStones,
        PlayerTwoStones,
        setPlayerTwoStones,
        MuehleGameField,
        setMuehleGameField,
        SelectedStone,
        setSelectedStone,
        SelectedDot,
        setSelectedDot] = useContext(MuehlenContext);


    const normal = {
        boxShadow: `0 8px 17px 2px rgba(255,255,255,0.14), 0 3px 14px 2px rgba(255,255,255,0.12), 0 5px 5px -3px rgba(255,255,255,0.2)`
    }

    const disabled = {
        pointerEvents: 'none',

    }

    const SetStoneToDot = async () => {
        console.log("setting stone " + SelectedStone + " to dot " + SelectedDot)

        let oldRefGame = firebase.firestore().collection('muehleGames').doc(props.chosenGameId);

        console.log(props.id);
        let updatePackage = {};
        if (props.id === 1) {
            updatePackage = {
                playerOneLeftStones: props.playerLeftStones-1,
                currentPlayer : props.id === 1 ? 2 : 1,
                updateDate : new Date(),
            }
        } else if (props.id === 2) {
            updatePackage = {
                playerTwoLeftStones : props.playerLeftStones-1,
                currentPlayer : props.id === 1 ? 2 : 1,
                updateDate : new Date(),
            }
        } else {
            console.log("Fatal - no Player id", props);
            return;
        }

        oldRefGame.update(updatePackage)
            .then(async function () {
                console.log("Game successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating Game: ", error);
            });
    }

    return (
        <div className="playerside" style={props.isPlaying ? normal : disabled}>
            <h3>Spieler: {props.playerName}</h3>
            <div className="stones">

                {props.id === 1
                    ? PlayerOneStones.slice().splice(-(9 - props.playerLeftStones, props.playerLeftStones)).map((item,index) => {
                        return <MuehleStone id={item.key} index={index} key={item.key} color={item.color}></MuehleStone>
                    })
                    : PlayerTwoStones.slice().splice(-(9 - props.playerLeftStones, props.playerLeftStones)).map((item,index) => {
                        return <MuehleStone id={item.key} index={index} key={item.key} color={item.color}></MuehleStone>
                    })
                }

            </div>
            <Button disabled={!SelectedStone || !SelectedDot || !props.isPlaying} onClick={() => SetStoneToDot()}>Stein setzen</Button>

        </div>
    )
}

export default MuehlePlayerSide;