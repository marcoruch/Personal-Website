import React, { useState, useEffect } from 'react';
import Tone from "tone";




export default function GyroFun() {
    const [timeMili, setTimeMili] = useState(0);
    const [pressing, setPressing] = useState(false);

    var synth = new Tone.Synth().toMaster()

    let soundSpec = "F3";

    const maxX = 500;
    const maxY = 500;

    const keyUp = () => {
        synth.triggerRelease()
        setPressing(false);
    }

    const keyDown = () => {
        synth.triggerAttackRelease('C4')
        setPressing(true);
    }


    window.onmousemove = function (event) {

        if (pressing) {
            console.log(event);
        }
    }


    useEffect(() => {

    }, [])


    return (
        <div style={{ 'backgroundColor': 'red', 'width': maxX, 'height': maxY }} onMouseDown={keyDown} onMouseUp={keyUp} >

        </div>
    )
}
