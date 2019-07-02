
import React, { useState, useEffect } from 'react';
import './HistoryPart.scss';

function HistoryPart(props) {
    return <div className="historyPart" style={props.historyFadeStyle}>
        <div className="history-left">
        <div className="timeSpentDisplay" style={{height: props.bubbleStyle.width, width: props.bubbleStyle.width, fontSize: Math.ceil(props.bubbleStyle.width/ 10) + 10}}>{props.historyPart.timeSpent}</div>
        <div className="bubbleConnector"></div>
        <div className={`bubble ${props.historyPart.timeSpent ? "": "current"}`} style={props.bubbleStyle}>
        </div>
        </div>
        <div className="history-middle">
            <h1>{props.historyPart.title}</h1>
            {props.historyPart.mileStone ? <h2 className="mileStone">{props.historyPart.mileStone}</h2>: <React.Fragment></React.Fragment>}
            {Object.values(props.historyPart.partialDesc).map(item =><h3>{item}</h3>)}
            
        </div>
        <div className="history-right">
            
        </div>
        
    </div>
};



export default HistoryPart;