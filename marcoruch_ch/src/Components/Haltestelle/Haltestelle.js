import React from "react";
import HaltestelleMap from "../HaltestelleMap/HaltestelleMap"
import HaltestelleResult from "../HaltestelleResult/HaltestelleResult"
import { HaltestellenProvider } from "../HaltestellenContext/HaltestellenContext"
import "./Haltestelle.scss"

const Haltestelle = () => {

    return (
        <div className="haltestelle">
            <div className="header">
                <h1>Spiel: Nächste Haltestelle berechnen</h1>
                <p>
                    Geben sie in der Karte eine Starthaltestelle ein sowie beliebig viele andere Haltestellen.
                    Klicken Sie danach auf "Berechnen".
                    </p>
            </div>
            <div className="game">
                <div className="game-data">
                    <HaltestellenProvider>
                            <HaltestelleMap></HaltestelleMap>
                        <HaltestelleResult></HaltestelleResult>
                    </HaltestellenProvider>
                </div>
            </div>

        </div>

    );
}

export default Haltestelle;