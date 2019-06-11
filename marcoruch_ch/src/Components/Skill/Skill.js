
import React, { Component } from 'react';
import ProgressBar from './../ProgressBar/ProgressBar';
import './Skill.scss';


class Skill extends Component {
    render() {
            return (
                <div className="skill-panel" data={this.props.skill}>
                        <h2 className="skill-title">{this.props.skill.lang}</h2>
                        <div className="skill-bar"><ProgressBar  percentage={this.props.skill.val}></ProgressBar></div>
                        <p className="skill-info">{this.props.skill.summary}</p>
                </div>
        );
    };
}


export default Skill;