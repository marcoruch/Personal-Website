import React, { Component } from 'react'
import Project from './../Project/Project';
import firebase from './../Firebase/Firebase';
import { Loader, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import "./Projects.scss";


class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            projects: [],
            currentProject: null,
        };
    }


    async componentWillMount() {
        let projectsCollection = firebase.firestore().collection('projects');
        let loadedProjects = await projectsCollection.get().then(snapshot => snapshot.docs.slice(0, 5).map(doc => doc.data()));

        for (let i = 0; i < loadedProjects.length; i++) {
            loadedProjects[i].key = i;
        }

        this.setState({ projects: loadedProjects, loading: false, currentProject: Math.ceil(loadedProjects.length / 2) });
    }



    render() {
        return !this.state.projects
            ? <Loader active inline='centered' />
            :

            <div className="projects">
                <div className="header">

                    <h1>Bisherige Arbeiten</h1>

                </div>
                <div className="projects-holder">
                <div className="more-projects">
                        <Link className="btn" to="/projects">Alle Projekte einsehen</Link>
                    </div>
                    {
                        this.state.projects.map((project) =>
                            <Project id={"Project_" + project.key} project={project}> </Project>
                        )
                    }
                  
                </div>  </div>
    };


}

export default Projects;