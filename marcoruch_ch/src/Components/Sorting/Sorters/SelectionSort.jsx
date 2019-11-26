import React, { useState, useEffect } from 'react';
import SorterElement from '../General/SorterElement';
import GetStateKeyByNumber from '../General/SorterHelper.js'
import FinalSwoosh from '../General/FinalSwoosh.js'
import Sleep from '../General/Sleeper.js'
import './Sorters.scss'
import PlaySound from '../General/Sounds';

export default function SelectionSort({ array, timeOut, maxNumber }) {
    const [CurrentArray, setCurrentArray] = useState(array);
    const [CurrentNumberFrom, setCurrentNumberFrom] = useState(null);
    const [CurrentNumberTo, setCurrentNumberTo] = useState(null);


    const SelectionSortAlgo = async (arr) => {
        let tempArray = Array.from(arr);
        let arrLength = tempArray.length; 
        
        for (let i = 0; i < arrLength - 1; i++) 
        { 
            let min_idx = i; 
            for (let j = i + 1; j < arrLength; j++) 
                if (tempArray[j] < tempArray[min_idx]) 
                    min_idx = j; 
  
            let temp = tempArray[min_idx]; 
            tempArray[min_idx] = tempArray[i]; 
            tempArray[i] = temp; 

            setCurrentNumberFrom(temp);
            setCurrentNumberTo(tempArray[min_idx] );
            setCurrentArray([...tempArray]);
            PlaySound(timeOut, tempArray[min_idx]  / maxNumber * 100)
            await Sleep(timeOut);
        } 
    }




    useEffect(() => {
        async function runAlgo() {
            await SelectionSortAlgo(array);
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
