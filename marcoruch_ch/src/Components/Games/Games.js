import React, { useState, useEffect } from "react";

import { Loader } from 'semantic-ui-react'
import firebase from '../Firebase/Firebase'
import { Link } from "react-router-dom";
import TopLevelEntryFormular from '../TopLevelEntryFormular/TopLevelEntryFormular'
import "./Games.scss"



function Games(props) {


    const [games, setGames] = useState(null);
    const [LoadAll] = useState(props.loadAll)
    const [LoadAmount] = useState(props.loadAmount)

    async function fetchGames() {
        const fetchedGames = [];

        await firebase.firestore().collection('games').orderBy("gameName", "desc").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    if (!LoadAll && fetchedGames.length == LoadAmount) {
                        return;
                    }
                    if(doc.data().active){
                        fetchedGames.push(doc.data());
                    }
                });
            })
        setGames(fetchedGames);
    }

    useEffect(() => {
        fetchGames();
    }, []);

    return <React.Fragment>{!games
        ? <div className="skillsloader"><Loader active inline='centered' /></div>
        : <div className="games">

            <div className="header">

            <h1>Minispiele & gelöste Aufgaben</h1>

            </div>

            <div className="games-holder">
            {games.map((game, index) =>

                <div className="card" key={game.gameId}>
                    <Link className="btn" to={`/${game.gameId}`}>
                    <header className="card-header" style={{ backgroundImage: `url(${game.gameImgUrl})` }}>
                        <h4 className="card-header--title">{game.gameNameShort}</h4>
                    </header></Link>

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
    }
    <TopLevelEntryFormular EntryKey={"games"}></TopLevelEntryFormular>
    </React.Fragment>
}

export default Games;






