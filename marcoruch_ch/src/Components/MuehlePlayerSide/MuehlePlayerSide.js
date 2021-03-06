import React, {  useContext } from "react";
import { MuehlenContext } from '../MuehleContext/MuehleContext'
import MuehleStone from '../MuehleStone/MuehleStone'
import "./MuehlePlayerSide.scss"
function MuehlePlayerSide(props) {

    const [PlayerOneStones, setPlayerOneStones,
        PlayerTwoStones, setPlayerTwoStones,
        MuehleGameField, setMuehleGameField,
        SelectedDot, setSelectedDot,
        Dragged, setDragged,
        DraggedOut, setDraggedOut,
        DraggedInField, setDraggedInField] = useContext(MuehlenContext);


    const normal = {
        boxShadow: `0 8px 17px 2px rgba(255,255,255,0.14), 0 3px 14px 2px rgba(255,255,255,0.12), 0 5px 5px -3px rgba(255,255,255,0.2)`
    }

    const disabled = {
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
    }

    const playing = {
        color: 'black',
    }

    const notPlaying = {
        color: 'rgba(100,100,100,0.5)',
    }

    const onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onDropped = (e) => {
        console.log(JSON.stringify(DraggedOut));
        handleGameStoneRemovedFromField(DraggedOut);
    }

    const handleGameStoneRemovedFromField = (item) => {
        props.handleGameStoneRemovedFromField(item);
    }

    return (
        <div className="playerside"
            style={props.isPlaying ? normal : disabled}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDropped(e)}>
            <h3 style={{...disabled,...(props.isPlaying ? playing : notPlaying)}}>Spieler: {props.playerName}</h3>
            {props.isPlaying ? <h4>Sie sind am Zug.</h4> : <React.Fragment></React.Fragment>}
            <h4 style={disabled}>{props.isPlaying && props.playerHasMuehle ? "Sie besitzen eine Mühle, klicken sie einen Gegnerischen Stein an, welchen Sie entfernen wollen." : ""}</h4>
            
            <div className="stones" style={props.isPlaying ? {} : {pointerEvents:'none',...disabled}}>

                {props.playerLeftStones > 0 ?
                    props.id === 1
                        ? PlayerOneStones.slice().splice(-(9 - props.playerLeftStones, props.playerLeftStones)).map((item, index) => {
                            return <MuehleStone id={item.key} playerHasMuehle={props.playerHasMuehle} index={index} key={item.key} color={item.color}></MuehleStone>
                        })
                        : PlayerTwoStones.slice().splice(-(9 - props.playerLeftStones, props.playerLeftStones)).map((item, index) => {
                            return <MuehleStone id={item.key} playerHasMuehle={props.playerHasMuehle} index={index} key={item.key} color={item.color}></MuehleStone>
                        })
                    : <div><h5>Alle Steine wurden gesetzt</h5></div>
                }

            </div>
        </div>
    )
}

export default MuehlePlayerSide;