import React, { useEffect, useState, useContext } from "react";
import MuehlePlayerSide from "../MuehlePlayerSide/MuehlePlayerSide";
import MuehleDot from "../MuehleDot/MuehleDot";

const dotsOuter = [1, 2, 3, 4, 5, 6, 7, 8]
const dotsMiddle = [9, 10, 11, 12, 13, 14, 15, 16]
const dotsCenter = [17, 18, 19, 20, 21, 22, 23, 24]

function MuehleGameField(props) {



    const getGameStone = (i) => {
        return props.chosenGame.gameField[props.chosenGame.gameField.filter(item => item.associatedDotId === i)[0].id];
    }

    return (
        <div className="muehle">
            <div className="header">
                <h1>Spiel: Mühle</h1>
                <p>
                    Klassisches Mühle Brettspiel. Ziehen sie per Drag-Drop die Spielsteine auf das Spielfeld - Viel Spass!
                             </p>
            </div>

            <MuehlePlayerSide id={1} playerHasMuehle={props.chosenGame.playerHasMuehle} isPlaying={props.chosenGame.currentPlayer === 1 && props.user === props.chosenGame.playerOne} playerName={props.chosenGame.playerOneName} player={props.chosenGame.playerOne} chosenGameId={props.chosenGame.id} playerLeftStones={props.chosenGame.playerOneLeftStones} handleGameStoneRemovedFromField={props.handleGameStoneRemovedFromField}></MuehlePlayerSide>
            <div className="muehle-game">
                <div className="outer-field">
                    {dotsOuter.map(i => <MuehleDot canMove={props.chosenGame.playerOneLeftStones === 0 && props.chosenGame.playerTwoLeftStones === 0} isWhitePlaying={props.chosenGame.currentPlayer === 1 && props.user === props.chosenGame.playerOne} isBlackPlaying={props.chosenGame.currentPlayer === 2 && props.user === props.chosenGame.playerTwo} currentPlayer={props.chosenGame.currentPlayer} playerHasMuehle={props.chosenGame.playerHasMuehle} handleGameStoneMovedOnField={props.handleGameStoneMovedOnField} handleGameStoneSetOnField={props.handleGameStoneSetOnField} handleGameStoneRemovedFromField={props.handleGameStoneRemovedFromField} id={i} gameStone={getGameStone(i)}></MuehleDot>)}
                    <div className="middle-field">
                        {dotsMiddle.map(i => <MuehleDot canMove={props.chosenGame.playerOneLeftStones === 0 && props.chosenGame.playerTwoLeftStones === 0} isWhitePlaying={props.chosenGame.currentPlayer === 1 && props.user === props.chosenGame.playerOne} isBlackPlaying={props.chosenGame.currentPlayer === 2 && props.user === props.chosenGame.playerTwo} currentPlayer={props.chosenGame.currentPlayer} playerHasMuehle={props.chosenGame.playerHasMuehle} handleGameStoneMovedOnField={props.handleGameStoneMovedOnField} handleGameStoneSetOnField={props.handleGameStoneSetOnField} handleGameStoneRemovedFromField={props.handleGameStoneRemovedFromField} id={i} gameStone={getGameStone(i)}></MuehleDot>)}
                        <div className="center-field">
                            {dotsCenter.map(i => <MuehleDot canMove={props.chosenGame.playerOneLeftStones === 0 && props.chosenGame.playerTwoLeftStones === 0} isWhitePlaying={props.chosenGame.currentPlayer === 1 && props.user === props.chosenGame.playerOne} isBlackPlaying={props.chosenGame.currentPlayer === 2 && props.user === props.chosenGame.playerTwo} currentPlayer={props.chosenGame.currentPlayer} playerHasMuehle={props.chosenGame.playerHasMuehle} handleGameStoneMovedOnField={props.handleGameStoneMovedOnField} handleGameStoneSetOnField={props.handleGameStoneSetOnField} handleGameStoneRemovedFromField={props.handleGameStoneRemovedFromField} id={i} gameStone={getGameStone(i)}></MuehleDot>)}
                        </div>
                    </div>
                </div>
            </div>
            <MuehlePlayerSide id={2} playerHasMuehle={props.chosenGame.playerHasMuehle} isPlaying={props.chosenGame.currentPlayer === 2 && props.user === props.chosenGame.playerTwo} playerName={props.chosenGame.playerTwoName} player={props.chosenGame.playerTwo} chosenGameId={props.chosenGame.id} playerLeftStones={props.chosenGame.playerTwoLeftStones} handleGameStoneRemovedFromField={props.handleGameStoneRemovedFromField}></MuehlePlayerSide>

        </div>
    )


}


export default MuehleGameField;