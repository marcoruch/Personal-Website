import React, { useState, useEffect } from "react";

import { Loader } from 'semantic-ui-react'
import firebase from '../Firebase/Firebase'
import { Link } from "react-router-dom";
import "./Games.scss"



function Games() {


    const [games, setGames] = useState(null);

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

            <div className="header">

            <h1>Minispiele & gelöste Aufgaben</h1>

            </div>

            <div className="games-holder">
            {games.map((game, index) =>

                <div className="card">
                    <header className="card-header" style={{ backgroundImage: `url(${game.gameImgUrl})` }}>
                        <h4 className="card-header--title">{game.gameNameShort}</h4>
                    </header>

                    <div className="card-body">
                        <p className="date">{game.gameUpdated.toDate().toLocaleDateString()}</p>

                        <h2>{game.gameName}</h2>

                        <p className="body-content">{game.desc}</p>
                     

                        <Link className="btn" to={`/${game.gameId}`}>
                            <i aria-hidden="true" className="angle right icon"></i>
                            Ausprobieren
                        </Link>

                    </div>

                </div>
            )}

            </div>
        </div>
    );
}

export default Games;






