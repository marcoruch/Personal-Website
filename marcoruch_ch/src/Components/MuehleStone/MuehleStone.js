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
        SelectedDot,
        setSelectedDot,
        Dragged, setDragged] = useContext(MuehlenContext);

    


    const onDragStart = (e) => {
        setDragged(props);
    }

    return (
        <div 
        id={props.index}
        key={props.id}
        className="stone" 
        draggable
        onDragStart={(e)=> onDragStart(e)}
        style={{backgroundColor: props.color}}>
 
        </div>
    )
}

export default MuehleStone;