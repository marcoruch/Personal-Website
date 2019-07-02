
import React, { useState, useEffect } from 'react';
import './HistoryPart.scss';

function HistoryPart(props) {
    return <div className="historyPart" style={props.historyFadeStyle}>
        <div className="history-left">
        <div className="timeSpentDisplay" style={{fontSize: Math.ceil(props.bubbleStyle.width/ 10) + 10}}>{props.historyPart.timeSpent}</div>
        <div className="bubbleConnector"></div>
        <div className="bubble" style={props.bubbleStyle}>
        </div>
        </div>
        <div className="history-middle">
            <h1>{props.historyPart.place}</h1>
            <h2>{props.historyPart.desc}</h2>
        </div>
        <div className="history-right">
            
        </div>
        
    </div>
};



export default HistoryPart;