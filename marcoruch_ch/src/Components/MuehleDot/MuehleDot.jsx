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
        DraggedOut, setDraggedOut,
        DraggedInField, setDraggedInField] = useContext(MuehlenContext);

    const [style, setStyle] = useState(null);

    const dragImg = new Image(); 
    dragImg.src =props.gameStone.isBlack ? BlackStone : WhiteStone; 
    

    // # NOT ALL SET
    const onDragStartNotAllSet = (e) => {
        e.dataTransfer.setDragImage(dragImg, 64,64);
        setDraggedOut(props);
    }

    const onClickStartNotAllSet = (e) => {
        props.handleGameStoneRemovedFromField(props);
    }


    const onDragOverNotAllSet = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onDroppedNotAllSet = (e) => {
        props.handleGameStoneSetOnField({ dragTo: parseInt(e.target.id), draggedFrom: Dragged})
    }

    const onClickedNotAllSet = (e) => {
        if (Dragged) props.handleGameStoneSetOnField({ dragTo: parseInt(e.target.id), draggedFrom: Dragged})
    }
    // #==================#

    // # ALL SET
    const onDragStartAllSet = (e) => {
        e.dataTransfer.setDragImage(dragImg, 64,64);
        setDraggedInField(props);
        
        if (props.playerHasMuehle) {
            setDraggedOut(props);
        }
    }

    const onClickStartAllSet = (e) => {
        if (props.playerHasMuehle) {
            props.handleGameStoneRemovedFromField(props);
        }
    }
    
    const onDragOverAllSet = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onDroppedAllSet = (e) => {
        props.handleGameStoneMovedOnField({ dragTo: parseInt(e.target.id), draggedFrom: DraggedInField})
    }

    const onClickAllSet = (e) => {
        if (DraggedInField) {
            props.handleGameStoneMovedOnField({ dragTo: parseInt(e.target.id), draggedFrom: DraggedInField})
        }
    }
    // #==================#



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
  
        props.canMove 
        // # WHEN ALL STONES ARE SET
        ? props.currentPlayer === 1 && props.gameStone.isWhite && props.isWhitePlaying && !props.playerHasMuehle
        ?
        <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            draggable
            onClick={(e) => onClickStartAllSet(e)}
            onDragStart={(e) => onDragStartAllSet(e)}>
                <div  id={props.id}  style={{cursor:'pointer',...style}}>
                    
                </div>
        </div>
        : props.currentPlayer === 2 && props.gameStone.isBlack && props.isBlackPlaying  && !props.playerHasMuehle
        ? <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            draggable
            onClick={(e) => onClickStartAllSet(e)}
            onDragStart={(e) => onDragStartAllSet(e)}>
                <div  id={props.id}  style={{cursor:'pointer',...style}}>
                
                </div>
        </div>
        // when there is any muehle
        : !props.gameStone.isBlack && !props.gameStone.isWhite && !props.playerHasMuehle ? 
            <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            onClick={(e) => onClickAllSet(e)}
            onDragOver={(e) => onDragOverAllSet(e)}
            onDrop={(e) => onDroppedAllSet(e)}>
                <div  id={props.id}  style={style}>
                
                </div>
        </div> : props.playerHasMuehle && props.currentPlayer === 1 && props.gameStone.isBlack
        ?
        // when it's a muehle stone of the opponent
        <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            draggable
            onClick={(e) => onClickStartAllSet(e)}
            onDragStart={(e) => onDragStartNotAllSet(e)}>
                <div  id={props.id}  style={{cursor:'pointer', ...style}}>
                
                </div>
        </div>
        : props.playerHasMuehle && props.currentPlayer === 2 && props.gameStone.isWhite
        ?         <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            draggable
            
            onClick={(e) => onClickStartAllSet(e)}
            onDragStart={(e) => onDragStartAllSet(e)}>
                <div  id={props.id}  style={{cursor:'pointer', ...style}}>
                
                </div>
        </div>
        : 
        <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            onClick={(e) => onClickAllSet(e)}
            onDragOver={(e) => onDragOverAllSet(e)}
            onDrop={(e) => onDroppedAllSet(e)}>
                <div  id={props.id}  style={style}>
                
                </div>
    </div>
        // # WHEN NOT ALL STONES ARE SET
        :  props.playerHasMuehle && props.currentPlayer === 1 && props.gameStone.isBlack
        ?
        // when it's a muehle stone of the opponent
        <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            draggable
            
            onClick={(e) => onClickStartNotAllSet(e)}
            onDragStart={(e) => onDragStartNotAllSet(e)}>
                <div  id={props.id}  style={style}>
                
                </div>
        </div>
        : props.playerHasMuehle && props.currentPlayer === 2 && props.gameStone.isWhite
        ?         <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            draggable
            onDragStart={(e) => onDragStartNotAllSet(e)}>
                <div  id={props.id}  style={style}>
                
                </div>
        </div>
        // when there is any muehle
        : props.playerHasMuehle
        ? <div 
        id={props.id} 
        className={`dot ${props.id}`} 
        key={props.id}>
            <div  id={props.id}  style={style}>
            
            </div>
        </div>
        :
        // when there is no muehle
        <div 
            id={props.id} 
            className={`dot ${props.id}`} 
            key={props.id}
            onClick={(e) => onClickedNotAllSet(e)}
            onDragOver={(e) => onDragOverNotAllSet(e)}
            onDrop={(e) => onDroppedNotAllSet(e)}>
                <div  id={props.id}  style={style}>
                
                </div>
        </div>
    )
}

export default MuehleDot;
