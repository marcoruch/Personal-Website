import React, { useEffect, useContext } from "react";
import "./Muehle.scss"

const dots = [1,2,3,4,5,6,7,8]

const dots_matrix =
[
    [1,0,0,1,0,0,1],
    [0,1,0,1,0,1,0],
    [0,0,1,1,1,0,0],
    [1,1,1,0,1,1,1],
    [0,0,1,1,1,0,0],
    [0,1,0,1,0,1,0],
    [1,0,0,1,0,0,1],
]

function Muehle() {
    return (
        <React.Fragment>
            <div className="muehle">
                <div className="header">
                    <h1>Mühle</h1>
                </div>
                <div className="game">
                    <div className="outer-field">
                    {dots.map(i => <div className="dot" draggable></div>) }
                        <div className="middle-field">
                    {dots.map(i => <div className="dot" draggable></div>) }
                            <div className="center-field">
                    {dots.map(i => <div className="dot" draggable></div>) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Muehle;