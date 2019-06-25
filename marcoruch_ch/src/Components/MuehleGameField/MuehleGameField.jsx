import React, { useEffect, useState, useContext } from "react";
import { MuehlenProvider, MuehlenContext } from "../MuehleContext/MuehleContext";
import MuehlePlayerSide from "../MuehlePlayerSide/MuehlePlayerSide";
import MuehleDot from "../MuehleDot/MuehleDot";

const dotsOuter = [1, 2, 3, 4, 5, 6, 7, 8]
const dotsMiddle = [9, 10, 11, 12, 13, 14, 15, 16]
const dotsCenter = [17, 18, 19, 20, 21, 22, 23, 24]

function MuehleGameField(props) {

    const [
        PlayerOneStones,
        setPlayerOneStones,
        PlayerTwoStones,
        setPlayerTwoStones, 
        MuehleGameField,
        setMuehleGameField,
        SelectedStone,
        setSelectedStone] = useContext(MuehlenContext);



    return (
        <div className="muehle">
            <div className="header">
                <h1>Spiel: Mühle</h1>
                <p>
                    Klassisches Mühle Brettspiel. Ziehen sie per Drag-Drop die Spielsteine auf das Spielfeld - Viel Spass!
                             </p>
            </div>

            <MuehlePlayerSide id={1} available={props.chosenGame.playerOne === props.user} playerName={props.chosenGame.playerOneName} player={props.chosenGame.playerOne} playerLeftStones={props.chosenGame.playerOneLeftStones}></MuehlePlayerSide>
            <div className="muehle-game">
                <div className="outer-field">
                    {dotsOuter.map(i =><MuehleDot id={i}></MuehleDot> )}
                    <div className="middle-field">
                        {dotsMiddle.map(i =><MuehleDot id={i}></MuehleDot> )}
                        <div className="center-field">
                            {dotsCenter.map(i =><MuehleDot id={i}></MuehleDot> )} 
                        </div>
                    </div>
                </div>
            </div>
            <MuehlePlayerSide id={2} available={props.chosenGame.playerTwo === props.user} playerName={props.chosenGame.playerTwoName} player={props.chosenGame.playerTwo} playerLeftStones={props.chosenGame.playerTwoLeftStones}></MuehlePlayerSide>
        </div>
    )


}


export default MuehleGameField;