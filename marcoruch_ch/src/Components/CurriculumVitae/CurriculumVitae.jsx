
import React, { useState, useEffect } from 'react';
import './CurriculumVitae.scss';
import Me from './../../Content/img/programmer.jpg'


function CurriculumVitae() {
    return (<React.Fragment>
        <div className="curriculumVitae">
            <div className="header">
                <img  alt="lol" src={Me}></img>
                <div className="meta">
                <h1>Marco Ruch</h1>
                <h2>Junior Software Engineer</h2>
                <h3>Aarau, Schweiz</h3></div>
            </div>
        </div>
    </React.Fragment>)
};



export default CurriculumVitae;