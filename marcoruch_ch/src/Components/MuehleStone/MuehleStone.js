import React, { useState, useContext } from "react";
import { MuehlenContext } from '../MuehleContext/MuehleContext'
import "./MuehleStone.scss"
function MuehleStone(props) {

    const [PlayerOneStones, setPlayerOneStones,
        PlayerTwoStones, setPlayerTwoStones,
        MuehleGameField, setMuehleGameField,
        SelectedDot, setSelectedDot,
        Dragged, setDragged,
        DraggedOut, setDraggedOut] = useContext(MuehlenContext);


    const onDragStart = (e) => {
        setDragged(props);
    }

    return (
        props.playerHasMuehle
            ? <div
                id={props.index}
                key={props.id}
                className="stone"
                style={{ backgroundColor: props.color, cursor: 'unset'}}>
            </div>
            : <div
                id={props.index}
                key={props.id}
                className="stone"
                draggable
                onDragStart={(e) => onDragStart(e)}
                style={{ backgroundColor: props.color, }}>
            </div>

    )
}

export default MuehleStone;