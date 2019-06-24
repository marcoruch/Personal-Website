import React, { useState, createContext, useEffect } from "react";



export const MuehlenContext = createContext();

const playerOneStones = Array(9).fill(0).map(function (value, index) { return { key: index+1, color: 'white' } });
const playerTwoStones = Array(9).fill(0).map(function (value, index) { return { key: index+1, color: 'black' } });

export const MuehlenProvider = props => {

    
    const [PlayerOneStones, setPlayerOneStones] = useState(playerOneStones);
    const [PlayerTwoStones, setPlayerTwoStones] = useState(playerTwoStones);



    const [MuehleGameField, setMuehleGameField] = useState([]);
    return (
        <MuehlenContext.Provider value={
            [
                PlayerOneStones, setPlayerOneStones,
                PlayerTwoStones, setPlayerTwoStones,
                MuehleGameField, setMuehleGameField,
            ]}>
            {props.children}
        </MuehlenContext.Provider>
    );
};
