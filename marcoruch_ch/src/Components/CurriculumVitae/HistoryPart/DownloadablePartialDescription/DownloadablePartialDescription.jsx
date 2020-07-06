import React from 'react';
import './DownloadablePartialDescription.scss';

function DownloadablePartialDescription(props) {
    return <div className="download">
                <h3>{props.item.name}</h3>
                <a download href={props.item.url}><small>(Download - {props.item.size}, PDF)</small></a>
        </div>
};

export default DownloadablePartialDescription;