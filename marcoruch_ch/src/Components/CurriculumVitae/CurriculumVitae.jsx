
import React, { useState, useEffect } from 'react';
import Me from './../../Content/img/marcoruch_cv.jpg'
import { Loader } from 'semantic-ui-react'
import HistoryPart from './HistoryPart/HistoryPart'
import axios from 'axios';
import API_HOST from '../../environment'




import './CurriculumVitae.scss';

function CurriculumVitae() {

    const [historyParts, setHistoryParts] = useState(null);
    const [type, setType] = useState(null);
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);

    async function fetchHistoryParts() {
        // Get History Parts

        let fetchedHistoryParts = [];
        await axios.get(`${API_HOST}/api/curriculumvitae`)
            .then(res => {
                console.log(res.data);
                fetchedHistoryParts = res.data;
            }).catch((error => {
                console.log(error.response);
                return;
            }))

        if (fetchedHistoryParts && fetchedHistoryParts.length > 0) {
            setHistoryParts(fetchedHistoryParts);

            for (let index = 0; index < fetchedHistoryParts.length; index++) {
                let span = null;

                if (fetchedHistoryParts[index].to) {
                    span = fetchedHistoryParts[index].to.seconds - fetchedHistoryParts[index].from.seconds;
                } else {
                    span = Math.floor(Date.now() / 1000) - fetchedHistoryParts[index].from.seconds;
                }

                if (span > max || max === null) {
                    setMax(span);
                } else if (span < min || min === null) {
                    setMin(span);
                }
            }
        }
    }

    
    useEffect(() => {
            fetchHistoryParts();
    }, []);


    const unique = (arr) => {
        return arr.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
    }

    const handleTypeChosen = (type) => {
        setType(type);
    }

    const historyFadeStyle = (index) => {
        return {
            opacity: 0,
            animation: `fadeHistoryPartIn 1.25s  forwards`,
            animationDelay: `${index * 0.6}s`
        }
    }

    const bubbleStyle = (factor) => {
        let biggest = 200 * 0.6;
        return { width: biggest * factor, height: biggest * factor }
    }


    const normalize = (element) => {
        let span = null;
        if (element.to) {
            span = element.to.seconds - element.from.seconds;
        } else {
            span = Math.floor(Date.now() / 1000) - element.from.seconds;
        }
        return (span - min) / (max - min) + 0.4;
    }

    return <div className="curriculumVitae">
        <div className="header">
            <div className="picture-holder">
                <img alt="CVpicture" src={Me}></img>
                <span role="img" aria-label="heart" className="imgAfter">❤️</span>
            </div>
            <div className="meta">
                <h1>Marco Ruch</h1>
                <h2>Junior Software Engineer</h2>
                <h3>Aarau, Schweiz</h3></div>
        </div>
        
        {
            historyParts === null
                ? <div className="historyloader"><Loader active inline='centered' /></div>
                : <div className="history">

                    <div className="history-header">
                        {unique(historyParts.map(historyPart => historyPart.type)).map((historyPartType) =>
                            <div className={type && historyPartType === type ? "type-small active" : "type-small"} onClick={() => handleTypeChosen(historyPartType)}>{historyPartType}</div>
                        )}
                        <div className={type === null ? "type-small active" : "type-small"} onClick={() => handleTypeChosen(null)}>Alle anzeigen</div>

                    </div>

                    {
                        historyParts
                            .filter(item => type === null || item.type === type)
                            .map((item, index) =>
                                <HistoryPart
                                    key={index}
                                    historyPart={item}
                                    bubbleStyle={bubbleStyle(normalize(item))}
                                    last={index === historyParts.filter(item => type === null || item.type === type).length - 1}
                                    historyFadeStyle={historyFadeStyle(index)}></HistoryPart>)
                    }
                </div>
        }
    </div>
};


export default CurriculumVitae;