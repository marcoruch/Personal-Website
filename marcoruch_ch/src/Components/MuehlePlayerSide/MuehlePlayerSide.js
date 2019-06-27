import React, { useEffect, useContext } from "react";
import { Button } from 'semantic-ui-react'
import { MuehlenContext } from '../MuehleContext/MuehleContext'
import MuehleStone from '../MuehleStone/MuehleStone'
import Swal from 'sweetalert2'
import firebase from './../Firebase/Firebase';
import "./MuehlePlayerSide.scss"
function MuehlePlayerSide(props) {

    const [
        PlayerOneStones,
        setPlayerOneStones,
        PlayerTwoStones,
        setPlayerTwoStones,
        MuehleGameField,
        setMuehleGameField,
        SelectedDot,
        setSelectedDot] = useContext(MuehlenContext);


    const normal = {
        boxShadow: `0 8px 17px 2px rgba(255,255,255,0.14), 0 3px 14px 2px rgba(255,255,255,0.12), 0 5px 5px -3px rgba(255,255,255,0.2)`
    }

    const disabled = {
        pointerEvents: 'none',

    }

    return (
        <div className="playerside" style={props.isPlaying ? normal : disabled}>
            <h3>Spieler: {props.playerName}</h3>
            <div className="stones">

                {props.playerLeftStones >0 ?
                    props.id === 1
                    ? PlayerOneStones.slice().splice(-(9 - props.playerLeftStones, props.playerLeftStones)).map((item,index) => {
                        return <MuehleStone id={item.key} index={index} key={item.key} color={item.color}></MuehleStone>
                    })
                    : PlayerTwoStones.slice().splice(-(9 - props.playerLeftStones, props.playerLeftStones)).map((item,index) => {
                        return <MuehleStone id={item.key} index={index} key={item.key} color={item.color}></MuehleStone>
                    })
                    : <div><h5>Alle Steine wurden gesetzt</h5></div>
                }

            </div>
        </div>
    )
}

export default MuehlePlayerSide;