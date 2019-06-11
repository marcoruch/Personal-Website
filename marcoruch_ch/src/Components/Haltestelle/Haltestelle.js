import React, { useState } from "react";
import HaltestelleMap from "../HaltestelleMap/HaltestelleMap"
import HaltestelleResult from "../HaltestelleResult/HaltestelleResult"
import { HaltestellenProvider } from "../HaltestellenContext/HaltestellenContext"
import "./Haltestelle.scss"

const Haltestelle = () => {

    return (
        <div className="haltestelle">
            <div className="header">
                <h1>Spiel: Haltestelle</h1>
                <p>
                    Geben sie in der Haltestellen Kart eine Starthaltestelle ein sowie beliebig viele andere Haltestellen.
                    Klicken Sie danach auf "Näheste Haltestelle berechnen".
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