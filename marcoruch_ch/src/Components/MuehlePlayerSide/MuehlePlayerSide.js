import React, { useEffect, useContext } from "react";
import { MuehlenContext } from '../MuehleContext/MuehleContext'
import MuehleStone from '../MuehleStone/MuehleStone'
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
        boxShadow:`0 8px 17px 2px rgba(255,255,255,0.14), 0 3px 14px 2px rgba(255,255,255,0.12), 0 5px 5px -3px rgba(255,255,255,0.2)`
    }

    const disabled = {
        pointerEvents: 'none',
        
    }



    return (
        <div className="playerside" style={props.available ? normal : disabled}>
            <h3>Spieler: {props.playerName}</h3>
            <div className="stones">

                {props.id === 1
                    ? PlayerOneStones.slice().splice(-(9 - props.playerLeftStones, 9 - props.playerLeftStones)).map((item) => {
                        return <MuehleStone id={item.key} key={item.key} color={item.color}></MuehleStone>
                    })
                    : PlayerTwoStones.slice().splice(-(9 - props.playerLeftStones, 9 - props.playerLeftStones)).map((item) => {
                        return <MuehleStone id={item.key} key={item.key} color={item.color}></MuehleStone>
                    })
                }

            </div>
        </div>
    )
}

export default MuehlePlayerSide;