
import React, { useState, useEffect } from 'react';
import Skill from './../Skill/Skill';
import { Loader } from 'semantic-ui-react'
import firebase from './../Firebase/Firebase'
import TopLevelEntryFormular from '../TopLevelEntryFormular/TopLevelEntryFormular'


import './Skills.scss';
import { isDeepStrictEqual } from 'util';

function Skills() {

    const [skills, setSkills] = useState(null);
    const [currentSkill, setCurrentSkill] = useState("All");

    async function fetchSkills() {
        const fetchedSkills = [];
        await firebase.firestore().collection('skills').where('val', ">", 40).orderBy("val", "desc").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                fetchedSkills.push(doc.data());
            });
        })
        setSkills(fetchedSkills);
    }

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleSkillChosen = (lang) => {
        if (lang === "All") {
            setCurrentSkill("All");
        } else {
            let currSkill = skills.filter(skill => skill.lang === lang)[0];
            setCurrentSkill(currSkill);
        }
    }


    return <React.Fragment>{!skills
        ? <div  className="skillsloader"><Loader active inline='centered' /></div>
        : (<div className="skills">
            <h1>Meine Erfahrungen in Projekten</h1>
            <div className="skills-header">

            {skills.map((skill) =>
                <div key={skill.lang} className={currentSkill && currentSkill.lang === skill.lang ? "skill-small active" : "skill-small"  } onClick={() => handleSkillChosen(skill.lang)}>{skill.lang}</div>
            )}
             <div className={currentSkill && currentSkill === "All" ? "skill-small active" : "skill-small"  } onClick={() => handleSkillChosen("All")}>Alle anzeigen</div>
            </div>
            {currentSkill === null || currentSkill === "All" ? <div className="ui  grid">
                {skills.map((skill) =>
                    <div className="eight wide column" key={skill.lang}>
                        <Skill key={skill.lang} skill={skill}></Skill>
                    </div>
                )}</div>
            : <div className="large-skill">
                <Skill key={currentSkill.lang} skill={currentSkill}></Skill>
            </div>}
            
        </div>
        )}
        <TopLevelEntryFormular EntryKey={"skills"}></TopLevelEntryFormular>
        </React.Fragment>
};



export default Skills;