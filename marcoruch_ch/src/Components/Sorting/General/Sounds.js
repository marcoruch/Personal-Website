import Tone from "tone";


const PlaySound = (time, percent) => {

    if (time > 25) {
        const distortion = new Tone.Distortion(1)
        const tremolo = new Tone.Tremolo().start()
        var polySynth = new Tone.PolySynth(100 - percent, Tone.Synth).chain(distortion, tremolo, Tone.Master)

        let arr = [
            'A', 'B', 'C',
        ];

        let f = Math.round(percent / 25);
        if (f > 2) f = 2;
        if (f < 1) f = 1;
        let b = Math.round(percent / 10) / 1.5;
        polySynth.triggerAttack([arr[f] + b])
        setTimeout(() => {
            polySynth.triggerRelease([arr[f] + b])
        }, time);

    }

}

export default PlaySound;