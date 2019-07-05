
import React, { useState } from 'react';
import { Responsive, Icon } from 'semantic-ui-react'
import Wave from 'react-wavify';
import GithubChart from '../GitHubChart/GithubChart'
import './AboutMe.scss';

function AboutMe() {
  const [icons] = useState(
    [
      { icon: "linkedin", url: "https://www.linkedin.com/in/marco-ruch-60b437153/" },
      { icon: "github", url: "https://github.com/marcoruch" },
    ]);

  return (
    <React.Fragment>
      <div id="hero">
    
        <Responsive maxWidth={768}>
          <div id="hero-top">
            <div id="hero-text-section"><h1>Marco Ruch</h1>
              <h2>shape your own future</h2>
            <GithubChart></GithubChart>
            <div className="icons-holder">
              {icons.map(item => <Icon key={item.icon} name={item.icon} size='large'  onClick={() => {  window.open(item.url, '_blank'  )}}   />)}</div>
            </div>
          </div>
        </Responsive>
        <Responsive minWidth={768} maxWidth={992}>
          <div id="hero-top" >
            <div id="hero-text-section"> <h1>Marco Ruch</h1>
              <h2>shape your own future</h2>
            <GithubChart></GithubChart>
            <div className="icons-holder">
              {icons.map(item => <Icon key={item.icon} name={item.icon}  size='large' onClick={() => {  window.open(item.url, '_blank'  )}}  />)}</div>
            </div>
          </div>
        </Responsive>
        <Responsive minWidth={992} maxWidth={1200}>
          <div id="hero-top">
            <div id="hero-text-section"> <h1>Marco Ruch</h1>
              <h2>shape your own future</h2>
            <GithubChart></GithubChart>
            <div className="icons-holder">
              {icons.map(item => <Icon key={item.icon} name={item.icon} size='large' onClick={() => {  window.open(item.url, '_blank'  )}}  />)}</div>
            </div>
          </div>
        </Responsive>
        <Responsive minWidth={1200}>
          <div id="hero-top">
            <div id="hero-text-section"> <h1 className="rubberBand">Marco Ruch</h1>
              <h2 className="rubberBand">shape your own future</h2>
              <GithubChart></GithubChart>
              
              <div className="icons-holder">
              {icons.map(item => <Icon key={item.icon} name={item.icon} size='big' onClick={() => {  window.open(item.url, '_blank'  )}}  />)}</div>
            </div>
          </div>

        </Responsive>
        <div id="hero-bot">
          <Wave id="hero-wave" fill='#212121'
            paused={false}
            options={{
              height: 100,
              amplitude: 30,
              speed: 0.20,
              points: 4
            }}
          />
        </div>
      </div>
     
    </React.Fragment>
  )
}

export default AboutMe;