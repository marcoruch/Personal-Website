import React, { useState, useEffect } from 'react';

import Project from './../Project/Project';
import Unauthorized from './../Unauthorized/Unauthorized'
import { Loader } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import axios from 'axios';
import API_HOST from '../../environment'

import "./Projects.scss";


function Projects(props) {

    const [Projects, setProjects] = useState(null)
    const [LoadAll, setLoadAll] = useState(props.loadAll)
    const [LoadAmount, setLoadAmount] = useState(props.loadAmount)
    const [IsUnauthorized, SetIsUnauthorized] = useState(false);

    /* Fetch Projects Max Retries */
    const maxRetries = 3;
    const [retriedFetching, setRetriedFetching] = useState(0);

    async function fetchProjects() {

        // Get History Parts

        let fetchedProjects = [];
        let projectsUrl = `${API_HOST}/api/projects`;
        /* AXIOS ONLY POSSIBLE WITH BLAZE */
        await axios.get(projectsUrl, {
            loadAll: LoadAll,
            loadAmount: LoadAmount,
        })
            .then(res => {
                console.log(res.data);
                fetchedProjects = res.data;
            }).catch((error => {
                console.log(`Error when fetching ${projectsUrl}...`);
                console.log(error);
                return;
            }))

        if (fetchedProjects && Array.isArray(fetchedProjects) && fetchedProjects.length > 0) {
            setProjects(fetchedProjects);
        } else {
            setRetriedFetching(retriedFetching+1);
        }

    }
    useEffect(() => {
        if (retriedFetching <= maxRetries)
        { 
            fetchProjects();
        } 
        else 
        { 
            SetIsUnauthorized(true); 
        }
    }, [retriedFetching])


    return IsUnauthorized ? <Unauthorized ContentName={"Projects"} />
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
            </div>
};
export default Projects;