import React from 'react';
import DownloadablePartialDescription from './DownloadablePartialDescription/DownloadablePartialDescription'
import './HistoryPart.scss';

function HistoryPart(props) {

    return <div className="historyPart" style={props.historyFadeStyle}>
        <div className="history-left" style={{paddingBottom: (props.historyPart.mileStone ? 65 : 0) + 45*Object.values(props.historyPart.partialDesc).length+'px'}}>
            <div className="timeSpentDisplay" style={{ height: props.bubbleStyle.width, width: props.bubbleStyle.width, fontSize: Math.ceil(props.bubbleStyle.width / 10) + 10 }}><p>{props.historyPart.timeSpent}</p></div>
            {props.last ? <div></div> : <div className="bubbleConnector"></div>}
            <div className={`bubble ${props.historyPart.timeSpent ? "" : "current"}`} style={props.bubbleStyle}></div>
        </div>
        <div className="history-right">
            <h1>{props.historyPart.title}  <small>{"( " + props.historyPart.from + (props.historyPart.to ? " - " + props.historyPart.to : "") + " )"}</small></h1>
            {props.historyPart.mileStone ? <h2 className="mileStone">{props.historyPart.mileStone}</h2> : <React.Fragment></React.Fragment>}
            {Object.values(props.historyPart.partialDesc)
                .map(item => 
                typeof item === 'string' 
                ? <h3>{item}</h3> 
                : <DownloadablePartialDescription item={item}></DownloadablePartialDescription>)}
        </div>
        

    </div>
};


export default HistoryPart;
