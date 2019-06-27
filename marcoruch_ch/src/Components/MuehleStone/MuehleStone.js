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
        setSelectedDot,
        Dragged, setDragged] = useContext(MuehlenContext);

    const normalStyle =
    {
        backgroundColor: props.color
    }

    const selectedStyle =
    {
        WebkitFilter: 'blur(5px) saturate(2)',
        transform: 'scale(1.1)',
        backgroundColor: props.color,
    }


    const setStone = () => {
        setSelectedStone(SelectedStone === props.id ? null : props.id)
    }

    const onDragStart = (e) => {
        setDragged(props);
    }

    return (
        <div 
        id={props.index}
        key={props.id}
        className="stone" 
        draggable onClick={() => setStone()} 
        onDragStart={(e)=> onDragStart(e)}
        style={SelectedStone === props.id ? selectedStyle : normalStyle}>
 
        </div>
    )
}

export default MuehleStone;