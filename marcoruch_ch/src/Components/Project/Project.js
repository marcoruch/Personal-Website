import React, { useState } from 'react'


import "./Project.scss";

function Project(props) {
  const [flipped, setFlipped] = useState(false);


  const flip = () => {
    setFlipped(!flipped);
  }
  const project = props.project;
  return (

    <div id={`card-${project.key}`} className="project">
      <div className="content">

        {
          flipped
            ? 
            <React.Fragment>
            <img src={project.thumbnailUrl} alt={project.thumbnailUrl} />
            <div className="description">

              {project.desc}
            </div>
            </React.Fragment>
            :
            <React.Fragment>

              <img src={project.thumbnailUrl} alt={project.thumbnailUrl} />
              <div className="body">
                <h1 className="header-text">{project.name}
                </h1>
                <div className="meta">{project.type} mit {project.lang}</div>

                <div className="content">
                  <div className="short-desc">
                    {project.desc}
                    <div className="fadeOut"></div>
                  </div>
                </div>
              </div>

            </React.Fragment>}
          
      </div>
      <div className="bottom">
              
              <div className="btn" onClick={flip}>
                      <i aria-hidden="true" className="angle right icon"></i>
                      { flipped ?  "Zur Übersicht" : "Mehr erfahren" }
                </div>
              </div>
    </div>
  );
}






export default Project;