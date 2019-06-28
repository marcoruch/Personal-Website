import React, { useEffect, useState, useContext } from "react";
import { MuehlenContext } from '../MuehleContext/MuehleContext'
import BlackStone from './../../Content/img/black_stone.png'
import WhiteStone from './../../Content/img/white_stone.png'



function MuehleDot(props) {

    const [PlayerOneStones, setPlayerOneStones,
        PlayerTwoStones, setPlayerTwoStones,
        MuehleGameField, setMuehleGameField,
        SelectedDot, setSelectedDot,
        Dragged, setDragged,
        DraggedOut, setDraggedOut] = useContext(MuehlenContext);

    const [style, setStyle] = useState(null);

    const dragImg = new Image(); 
    dragImg.src =props.gameStone.isBlack ? BlackStone : WhiteStone; 
    
    const onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onDropped = (e) => {
        props.handleGameStoneSetOnField({ dragTo: parseInt(e.target.id), draggedFrom: Dragged})
    }
    

    const onDragStart = (e) => {
        e.dataTransfer.setDragImage(dragImg, 64,64);
        setDraggedOut(props);
    }

    useEffect(() => {
        if (SelectedDot === props.id) {
            setStyle({
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: (props.gameStone.isBlack || props.gameStone.isWhite) ? 'scale(1.75)' : 'scale(1.25)',
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
            });
        }
    }, [])
    
    return (
  
        props.playerHasMuehle && props.currentPlayer === 1 && props.gameStone.isBlack
        ?
        // when it's a muehle stone of the opponent
        <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            draggable
            onDragStart={(e) => onDragStart(e)}>
                <div  id={props.id}  style={{color:'red',...style}}>
                
                </div>
        </div>
        : props.playerHasMuehle && props.currentPlayer === 2 && props.gameStone.isWhite
        ?         <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            draggable
            onDragStart={(e) => onDragStart(e)}>
                <div  id={props.id}  style={{color:'red',...style}}>
                
                </div>
        </div>
        // when there is any muehle
        : props.playerHasMuehle
        ? <div 
        id={props.id} 
        className={`dot ${props.id}`} 
        key={props.id}>
            <div  id={props.id}  style={{color:'red',...style}}>
            
            </div>
        </div>
        :
        // when there is no muehle
        <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDropped(e)}>
                <div  id={props.id}  style={{color:'red',...style}}>
                
                </div>
        </div>
    )
}

export default MuehleDot;
