
import React, { useState, useEffect } from 'react';
import Me from './../../Content/img/marcoruch_cv.jpg'
import firebase from './../Firebase/Firebase';
import { Loader, Container } from 'semantic-ui-react'
import HistoryPart from './HistoryPart/HistoryPart'
import dateFormat from 'dateformat';
import axios from 'axios';
import API_HOST from '../../environment'




import './CurriculumVitae.scss';

function CurriculumVitae() {

    const [historyParts, setHistoryParts] = useState(null);
    const [type, setType] = useState(null);
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);
    const [Unauthorized, setUnauthorized] = useState(false)

    async function fetchHistoryParts() {
        // Get History Parts

        let fetchedHistoryParts = [];
                /* AXIOS ONLY POSSIBLE WITH BLAZE */
              await axios.get(`${API_HOST}/api/curriculumvitae`)
            .then(res => {
                console.log(res.data);
                fetchedHistoryParts = res.data;
            }).catch((error => {
                console.log(error.response);
                return;
            }))

        if (fetchedHistoryParts && Array.isArray(fetchedHistoryParts) &&  fetchedHistoryParts.length > 0) {
            setHistoryParts(fetchedHistoryParts);

            for (let index = 0; index < fetchedHistoryParts.length; index++) {
                let span = null;

                if (fetchedHistoryParts[index].toSec) {
                    span = fetchedHistoryParts[index].toSec - fetchedHistoryParts[index].fromSec;
                } else {
                    span = Math.floor(Date.now() / 1000) - fetchedHistoryParts[index].fromSec;
                }

                if (span > max || max === null) {
                    setMax(span);
                } else if (span < min || min === null) {
                    setMin(span);
                }
            }
        } else {
            setUnauthorized(true);
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
        if (element.toSec) {
            span = element.toSec - element.fromSec;
        } else {
            span = Math.floor(Date.now() / 1000) - element.fromSec;
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
        
        { Unauthorized ? <Container className="unauthorized" textAlign='center'>It seems like you are not authorized yet.</Container>
           : historyParts === null
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