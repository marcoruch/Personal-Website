import React, { useEffect, useState, useContext } from "react";
import { MuehlenContext } from '../MuehleContext/MuehleContext'




function MuehleDot(props) {

    console.log(props);
    const normalStyle =
    {
        backgroundColor: props.color
    }

    const selectedStyle =
    {
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: 'scale(1.25)',
        cursor: 'pointer',
        backgroundColor: '#1E150F',
        WebkitFilter: 'blur(5px) saturate(2)',
        zIndex:100,
    }


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

            // case 1 - dot already selected
            if (SelectedDot === id) {
                setSelectedDot(null);

            // case 2 - select dot
            } else {
                setSelectedDot(id);
            }
           
         }


    return (
        <div className={`dot ${props.id}`} onClick={() => dotClicked(props.id)}  key={props.id}>
            <div  style={SelectedDot === props.id ? selectedStyle : normalStyle}></div>
        </div>
    )
}

export default MuehleDot;
