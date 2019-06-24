import React, { useEffect, useContext } from "react";
import { MuehlenContext } from '../MuehleContext/MuehleContext'
import MuehleStone from '../MuehleStone/MuehleStone'
import "./MuehlePlayerSide.scss"
function MuehlePlayerSide(props) {

    const [
        PlayerOneStones,
        setPlayerOneStones,
        PlayerTwoStones,
        setPlayerTwoStones] = useContext(MuehlenContext);


    console.log(PlayerOneStones);
    return (
        <div className="playerside">
            <h3>Spieler: {props.player}</h3>
            <div className="stones">

                {props.player === 1
                    ? PlayerOneStones.map((item) => {
                        return <MuehleStone key={item.key} color={item.color}></MuehleStone>
                    })
                    : PlayerTwoStones.map((item) => {
                        return <MuehleStone key={item.key} color={item.color}></MuehleStone>
                    })
                }

            </div>
        </div>
    )
}

export default MuehlePlayerSide;