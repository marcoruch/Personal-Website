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
        setSelectedDot,
        Dragged,
         setDragged] = useContext(MuehlenContext);

    const [style, setStyle] = useState(null);

    const onDragOver = (e) => {

        e.stopPropagation();
        e.preventDefault();
    }

    const onDropped = (e) => {
        console.log(parseInt(e.target.id));
        props.handleGameStoneSetOnField({ dragTo: parseInt(e.target.id), draggedFrom: Dragged})
    }
     

    useEffect(() => {
        if (SelectedDot === props.id) {
            setStyle({
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: (props.gameStone.isBlack || props.gameStone.isWhite) ? 'scale(1.75)' : 'scale(1.25)',
                cursor: 'pointer',
                backgroundColor: props.gameStone.isBlack ? 'black' : props.gameStone.isWhite ? 'white' : 'grey',
                WebkitFilter: props.gameStone.isBlack ? 'black' : props.gameStone.isWhite ? 'white' : 'blur(20px) saturate(2)',
                zIndex: 100,
                borderRadius:'100%',
            });
        } else {
            setStyle({
                transform: (props.gameStone.isBlack || props.gameStone.isWhite) ? 'scale(1.75)' : 'scale(1)',
                backgroundColor: props.gameStone.isBlack ? 'black' : props.gameStone.isWhite ? 'white' : 'grey',
                zIndex: 100,
                position: 'absolute',
                width: '100%',
                height: '100%', 
                borderRadius:'100%',
                cursor: 'pointer',
            });
        }
    }, [])






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

        <div 
       
            id={props.id} 
            className={`dot ${props.id}`} 
            onClick={() => dotClicked(props.id)} 
            key={props.id}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDropped(e)}>
                <div  id={props.id}  style={style}>
                   
                </div>
        </div>
    )
}

export default MuehleDot;
