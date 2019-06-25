import React, { useState, useContext } from "react";
import { MuehlenContext } from '../MuehleContext/MuehleContext'
import "./MuehleStone.scss"
function MuehleStone(props) {

    const [PlayerOneStones,
        setPlayerOneStones,
        PlayerTwoStones,
        setPlayerTwoStones,
        MuehleGameField,
        setMuehleGameField,
        SelectedStone,
        setSelectedStone,
        SelectedDot,
         setSelectedDot] = useContext(MuehlenContext);

    const normalStyle =
    {
        backgroundColor: props.color
    }

    const selectedStyle =
    {
        border: '1px solid red',
        transform: 'scale(1.1)',
        backgroundColor: props.color,
    }


    const setStone = () => {
        setSelectedStone(SelectedStone === props.id ? null : props.id)
    }

    return (
        <div className="stone" onClick={() => setStone()} style={SelectedStone === props.id ? selectedStyle : normalStyle}>

        </div>
    )
}

export default MuehleStone;