
import React, { useState, useEffect } from 'react';
import './CurriculumVitae.scss';
import Me from './../../Content/img/programmer.jpg'
import { Loader } from 'semantic-ui-react'
import firebase from './../Firebase/Firebase'
import HistoryPart from './HistoryPart/HistoryPart.jsx'

function CurriculumVitae() {

    const [historyParts, setHistoryParts] = useState(null);

    async function fetchHistoryParts() {
        const fetchedHistoryParts = [];
        await firebase.firestore().collection('historyParts').orderBy("val", "desc").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                fetchedHistoryParts.push(doc.data());
            });
        })
        setHistoryParts(fetchedHistoryParts);
    }

    useEffect(() => {
        fetchHistoryParts();
    }, []);

    const historyFadeStyle = (index) => {
        return {animation: `fadeHistoryPartIn ${index*0.3}s forwards`,}
    }

    return !historyParts
        ? <div  className="skillsloader"><Loader active inline='centered' /></div>
        :<React.Fragment>
        <div className="curriculumVitae">
            <div className="header">
                <img  alt="lol" src={Me}></img>
                <div className="meta">
                <h1>Marco Ruch</h1>
                <h2>Junior Software Engineer</h2>
                <h3>Aarau, Schweiz</h3></div>
            </div>
            <div className="history">
                {historyParts.map((item,index) => <HistoryPart item={item} historyFadeStyle={index}></HistoryPart>)}
            </div>
        </div>
    </React.Fragment>
};



export default CurriculumVitae;