import React, { useState, createContext, useEffect } from "react";



export const MuehlenContext = createContext();

const playerOneStones = Array(9).fill(0).map(function (value, index) { return { key: `${index+1}-white`, color: 'white' } });
const playerTwoStones = Array(9).fill(0).map(function (value, index) { return { key: `${index+1}-black`, color: 'black' } });

export const MuehlenProvider = props => {

    
    const [PlayerOneStones, setPlayerOneStones] = useState(playerOneStones);
    const [PlayerTwoStones, setPlayerTwoStones] = useState(playerTwoStones);
    const [MuehleGameField, setMuehleGameField] = useState([]);
    const [SelectedStone, setSelectedStone] = useState(null);
    const [SelectedDot, setSelectedDot] = useState(null);
    const [Dragged, setDragged] = useState(null);

    return (
        <MuehlenContext.Provider value={
            [
                PlayerOneStones, setPlayerOneStones,
                PlayerTwoStones, setPlayerTwoStones,
                MuehleGameField, setMuehleGameField,
                SelectedStone, setSelectedStone,
                SelectedDot, setSelectedDot,
                Dragged, setDragged,
            ]}>
            {props.children}
        </MuehlenContext.Provider>
    );
};
