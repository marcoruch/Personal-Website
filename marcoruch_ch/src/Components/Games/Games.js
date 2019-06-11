import React, { useState, useEffect } from "react";

import { Loader } from 'semantic-ui-react'
import firebase from './../Firebase/Firebase'
import { Link } from "react-router-dom";
import "./Games.scss"



function Games() {


    const [games, setGames] = useState(null);
    const [currentSkill, setCurrentSkill] = useState(null);

    async function fetchGames() {
        const fetchedGames = [];
        await firebase.firestore().collection('games').orderBy("gameName", "desc").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    fetchedGames.push(doc.data());
                });
            })
        setGames(fetchedGames);
    }

    useEffect(() => {
        fetchGames();
    }, []);

    return (!games
        ? <div className="skillsloader"><Loader active inline='centered' /></div>
        : <div className="games">


                    {games.map(game => 
                    
                   
                    <Link to={`/${game.gameId}`}>{game.gameName}</Link>
                    
                    )}
             
        </div>
    );
}

export default Games;






