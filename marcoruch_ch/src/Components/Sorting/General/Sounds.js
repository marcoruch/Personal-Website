import Tone from "tone";
import Sleep from "./Sleeper";

const polySynth = new Tone.PolySynth(100, Tone.Synth).chain(Tone.Master)
polySynth.volume.value = -15;


const PlaySound = async (time, percent) => {

    let arr = [
        'A', 'B', 'C',
    ];

    let f = Math.round(percent / 25);
    if (f > 2) f = 2;
    if (f < 1) f = 1;
    let b = Math.round(percent / 10) / 1.5;
    polySynth.triggerAttackRelease([arr[f] + b], time / 1000)
    await Sleep(time);


}

export default PlaySound;