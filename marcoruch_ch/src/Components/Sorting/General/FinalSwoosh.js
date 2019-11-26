import Sleep from './Sleeper';
import PlaySound from './Sounds';

const FinalSwoosh = async (funcFrom, funcTo, array, timeOut) => {
    funcFrom(-1);
    funcTo(-1);

   
    for (let index = 0; index < array.length; index++) {
        funcTo(index);
        PlaySound(timeOut,  index / array.length * 100);
        await Sleep(timeOut);
    }
    funcTo(-1);
}

export default FinalSwoosh;