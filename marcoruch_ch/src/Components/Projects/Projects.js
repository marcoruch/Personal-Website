import React, { useState, useEffect } from 'react';
import Project from './../Project/Project';
import Unauthorized from './../Unauthorized/Unauthorized'
import TopLevelEntryFormular from './../TopLevelEntryFormular/TopLevelEntryFormular'
import { Loader } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';
import API_HOST from '../../environment'

import "./Projects.scss";


function Projects(props) {
    const [Projects, setProjects] = useState(null)
    const [LoadAll] = useState(props.loadAll)
    const [LoadAmount] = useState(props.loadAmount)
    const [IsUnauthorized, SetIsUnauthorized] = useState(false);

    /* Fetch Projects Max Retries */
    const maxRetries = 3;
    const [retriedFetching, setRetriedFetching] = useState(0);

    async function fetchProjects() {

        // Get History Parts

        let fetchedProjects = [];
        let projectsUrl = LoadAll
            ? `${API_HOST}/api/projects`
            : `${API_HOST}/api/projectslimit/${LoadAmount}`;

        await axios.get(projectsUrl)
            .then(res => {
                fetchedProjects = res.data;
            }).catch((error => {
                if (error.status === 401){
                    SetIsUnauthorized(true);
                }
                console.error(`Error when fetching ${projectsUrl}...`);
                console.log(error.response);
                return;
            }))

        if (fetchedProjects && Array.isArray(fetchedProjects) && fetchedProjects.length > 0) {
            setProjects(fetchedProjects);
        } else {
            setRetriedFetching(retriedFetching + 1);
        }

    }
    useEffect(() => {
        if (retriedFetching <= maxRetries && !IsUnauthorized) {
            fetchProjects();
        }
        else {
            SetIsUnauthorized(true);
        }
    }, [retriedFetching])


    return <React.Fragment> {IsUnauthorized ? <Unauthorized ContentName={"Projects"} />
        : Projects === null ? <div className="projectsloader"><Loader active inline='centered' /></div>
            : <div className="projects">
                <div className="header">
                    <h1>Bisherige Arbeiten</h1>
                </div>
                <div className="projects-holder">

                    {!LoadAll && Projects.length > 0 ? <div className="more-projects">
                        <Link className="btn" to="/projects">Alle Projekte einsehen</Link>
                    </div> : <React.Fragment></React.Fragment>}
                    {
                        Projects.map((project) =>
                            <Project id={"Project_" + project.key} project={project}> </Project>
                        )
                    }
                </div>
            </div>}
            <TopLevelEntryFormular EntryKey={"projects"}></TopLevelEntryFormular>
    </React.Fragment>

};
export default Projects;