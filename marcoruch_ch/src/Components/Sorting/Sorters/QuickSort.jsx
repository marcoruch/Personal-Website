import React, { useState, useEffect } from 'react';
import SorterElement from '../General/SorterElement';
import GetStateKeyByNumber from '../General/SorterHelper.js'
import FinalSwoosh from '../General/FinalSwoosh.js'
import Sleep from '../General/Sleeper.js'
import './Sorters.scss'
import PlaySound from '../General/Sounds';

export default function QuickSort({ array, timeOut, maxNumber }) {
    const [CurrentArray, setCurrentArray] = useState(array);
    const [CurrentNumberFrom, setCurrentNumberFrom] = useState(null);
    const [CurrentNumberTo, setCurrentNumberTo] = useState(null);


    const Partition = async (tempArray, low, high) => {
        let pivot = tempArray[high];

        // Index von kleinem Element
        let i = (low - 1);
        for (let j = low; j < high; j++) {
            // Wenn das Element kleiner als Pivot ist
            if (tempArray[j] < pivot) {
                i++;

                // Tausch von tempArray[i] und tempArray[j] 
                let temp = tempArray[i];
                tempArray[i] = tempArray[j];
                tempArray[j] = temp;

                setCurrentNumberFrom(temp);
                setCurrentNumberTo(tempArray[j]);
                setCurrentArray([...tempArray]);
                PlaySound(timeOut, tempArray[j] / maxNumber * 100)
                await Sleep(timeOut);
            }
        }

        // Tausch von arr[i+1] und arr[high] (oder Pivot) 
        let temp1 = tempArray[i + 1];
        tempArray[i + 1] = tempArray[high];
        tempArray[high] = temp1;

        setCurrentNumberFrom(temp1);
        setCurrentNumberTo(tempArray[i + 1]);
        setCurrentArray([...tempArray]);

        PlaySound(timeOut, tempArray[i + 1] / maxNumber * 100)
        await Sleep(timeOut);

        return {pi: i + 1, arr: tempArray};
    }


    const QuickSortAlgo = async (arr, low, high) => {
       
        if (low < high) {

            // Partitions-Index = PI
            // PI ist jetzt am richtigen Ort
            let obj = await Partition(Array.from(arr), low, high);
            
            // Rekursiv Elemente vor .... 
            arr = await QuickSortAlgo(Array.from(obj.arr), low, obj.pi - 1);
            
            // ... und nach Partitions-Index sortieren
            arr = await QuickSortAlgo(Array.from(arr), obj.pi + 1, high);
        }
        return arr;
    }




    useEffect(() => {
        async function runAlgo() {
            await QuickSortAlgo(array, 0, array.length - 1);
            FinalSwoosh(setCurrentNumberFrom, setCurrentNumberTo, array, timeOut);
        }
        runAlgo();
    }, [array, timeOut]);

    return (
        <React.Fragment>
            <div className="sorters">
                {CurrentArray.map(number =>
                    <SorterElement
                        number={number}
                        maxNumber={maxNumber}
                        width={(window.innerWidth - ((array.length - 1) * 20)) / array.length}
                        state={GetStateKeyByNumber(number, CurrentNumberFrom, CurrentNumberTo)}></SorterElement>)}
            </div>
        </React.Fragment>
    );
}
