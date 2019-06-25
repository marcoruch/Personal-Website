import React, { useEffect, useState, useContext } from "react";
import { MuehlenContext } from '../MuehleContext/MuehleContext'




function MuehleDot(props) {

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


         const dotClicked = (id) => {


            // case 1 - player setting stone

            if (SelectedStone) {

            } else if (SelectedDot == id) {
                setSelectedDot(null);
            } else {
                setSelectedDot(id);
            }
           
         }


    return (
        <div className="dot" onClick={() => dotClicked(props.id)}  key={props.id}>

        </div>
    )
}

export default MuehleDot;
