
import React, { useState } from 'react';
import { Responsive, Icon, Image } from 'semantic-ui-react'
import Wave from 'react-wavify';
import ProgrammerLogo from './../../Content/img/programmer.jpg';

import GithubChart from '../GitHubChart/GithubChart'
import { Link } from "react-router-dom";
import './AboutMe.scss';



function AboutMe() {
  const [icons, setIcons] = useState(
    [
      { icon: "linkedin", url: "https://www.linkedin.com/in/marco-ruch-60b437153/" },
      { icon: "github", url: "https://github.com/marcoruch" },
    ]);

  const [bubbles, setBubbles] = useState(
    [
      { key: 0, X: '10%', Y: '20%', link: "projects", text: "Projekte" },
      { key: 1, X: '30%', Y: '45%', link: "skills", text: "Fähigkeiten" },
      { key: 1, X: '73%', Y: '20%', link: "blog", text: "Blog" },
      { key: 1, X: '66%', Y: '35%', link: "contact", text: "Kontakt" },
    ]);

  function bubbleStyle(bubble) {
    return {
      position: 'absolute',
      backgroundColor: '#696162',
      top: bubble.Y,
      left: bubble.X,
    }
  }


  return (
    <React.Fragment>
      <div id="pixi-header">
        
      </div>
      <div id="hero">
        <Responsive maxWidth={768}>
          <div id="hero-top">
            <div id="hero-image-section">
              <Image
                src={ProgrammerLogo}
                as='a'
                size='medium'
                target='_blank'
              />
            </div>
            <div id="hero-text-section"><h1>Marco Ruch</h1>
              <h2>Quality over Quantity</h2>
            <GithubChart></GithubChart>
            <div className="icons-holder">
              {icons.map(item => <Icon key={item.icon} name={item.icon} size='large'  onClick={() => {  window.open(item.url, '_blank'  )}}   />)}</div>
            </div>
          </div>
        </Responsive>
        <Responsive minWidth={768} maxWidth={992}>
          <div id="hero-top" >
            <div id="hero-image-section">
              <Image
                src={ProgrammerLogo}
                as='a'
                size='medium'
                target='_blank'
              />
            </div>
            <div id="hero-text-section"> <h1>Marco Ruch</h1>
              <h2>Quality over Quantity</h2>
            <GithubChart></GithubChart>
            <div className="icons-holder">
              {icons.map(item => <Icon key={item.icon} name={item.icon}  size='large' onClick={() => {  window.open(item.url, '_blank'  )}}  />)}</div>
            </div>
          </div>
        </Responsive>
        <Responsive minWidth={992} maxWidth={1200}>
          <div id="hero-top">
            <div id="hero-image-section">
              <Image
                src={ProgrammerLogo}
                as='a'
                size='medium'
                target='_blank'
              />
            </div>
            <div id="hero-text-section"> <h1>Marco Ruch</h1>
              <h2>Quality over Quantity</h2>
            <GithubChart></GithubChart>
            <div className="icons-holder">
              {icons.map(item => <Icon key={item.icon} name={item.icon} size='large' onClick={() => {  window.open(item.url, '_blank'  )}}  />)}</div>
            </div>
          </div>
        </Responsive>
        <Responsive minWidth={1200}>
          <div id="hero-top">
            <div id="hero-image-section">
            <Image
                src={ProgrammerLogo}
                as='a'
                size='medium'
                target='_blank'
              />
            </div>
            <div id="hero-text-section"> <h1>Marco Ruch</h1>
              <h2>Quality over Quantity</h2>
              <GithubChart></GithubChart>
              <div className="icons-holder">
              {icons.map(item => <Icon key={item.icon} name={item.icon} size='big' onClick={() => {  window.open(item.url, '_blank'  )}}  />)}</div>
              {bubbles.map(bubble => <Link to={`/${bubble.link}`} key={bubble.key} className={"hero-bubble"} style={bubbleStyle(bubble)} >{bubble.text}</Link>)}
            </div>
          </div>
        </Responsive>
        <div id="hero-bot">
          <Wave id="hero-wave" fill='#837A7B'
            paused={false}
            options={{
              height: 20,
              amplitude: 30,
              speed: 0.15,
              points: 3
            }}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default AboutMe;