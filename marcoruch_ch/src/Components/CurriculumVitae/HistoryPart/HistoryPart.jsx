
import React, { useState, useEffect } from 'react';
import DownloadablePartialDescription from './DownloadablePartialDescription/DownloadablePartialDescription'
import './HistoryPart.scss';

function HistoryPart(props) {

    return <div className="historyPart" style={props.historyFadeStyle}>
        <div className="history-left">
            <div className="timeSpentDisplay" style={{ height: props.bubbleStyle.width, width: props.bubbleStyle.width, fontSize: Math.ceil(props.bubbleStyle.width / 10) + 10 }}>{props.historyPart.timeSpent}</div>
            {props.last ? <div></div> : <div className="bubbleConnector"></div>}
            <div className={`bubble ${props.historyPart.timeSpent ? "" : "current"}`} style={props.bubbleStyle}></div>
        </div>
        <div className="history-middle">
            <h1>{props.historyPart.title}  <small>{"( " + props.historyPart.from.toDate().toLocaleDateString() + (props.historyPart.to ? " - " + props.historyPart.to.toDate().toLocaleDateString() : "") + " )"}</small></h1>
            {props.historyPart.mileStone ? <h2 className="mileStone">{props.historyPart.mileStone}</h2> : <React.Fragment></React.Fragment>}
            {Object.values(props.historyPart.partialDesc)
                .map(item => 
                typeof item === 'string' 
                ? <h3>{item}</h3> 
                : <DownloadablePartialDescription item={item}></DownloadablePartialDescription>)}
        </div>
        <div className="history-right">

        </div>

    </div>
};



export default HistoryPart;