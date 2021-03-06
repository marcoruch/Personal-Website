import React, { useState, useEffect } from 'react';
import SorterElement from '../General/SorterElement';
import GetStateKeyByNumber from '../General/SorterHelper.js'
import FinalSwoosh from '../General/FinalSwoosh.js'
import Sleep from '../General/Sleeper.js'
import './Sorters.scss'
import PlaySound from '../General/Sounds';

export default function BubbleSort({ array, maxNumber, timeOut, setSortingActive }) {
    const [CurrentArray, setCurrentArray] = useState(array);
    const [CurrentNumberFrom, setCurrentNumberFrom] = useState(null);
    const [CurrentNumberTo, setCurrentNumberTo] = useState(null);

    const BubbleSort = async () => {
        let tempArray = Array.from(array);
        for (let i = 0; i < tempArray.length - 1; i++) {
            for (let j = 0; j < tempArray.length - i - 1; j++) {
                if (tempArray[j] > tempArray[j + 1]) {
                    let temp = tempArray[j];
                    tempArray[j] = tempArray[j + 1];
                    tempArray[j + 1] = temp;
                    setCurrentNumberFrom(temp);
                    setCurrentNumberTo(tempArray[j]);
                    setCurrentArray([...tempArray]);
                    await PlaySound(timeOut, tempArray[j] / maxNumber * 100)
                }
            }
        }
    }

    useEffect(() => {
        async function RunData() {
            setSortingActive(true);
            await BubbleSort();
            await FinalSwoosh(setCurrentNumberFrom, setCurrentNumberTo, array, timeOut);
            setSortingActive(false);
        }
        RunData();
    }, []);

    return (
        <React.Fragment>
            <div className="sorters">
                {CurrentArray.map(number =>
                    <SorterElement
                        key={number}
                        number={number}
                        maxNumber={maxNumber}
                        width={(window.innerWidth - ((array.length - 1) * 20)) / array.length}
                        state={GetStateKeyByNumber(number, CurrentNumberFrom, CurrentNumberTo)}></SorterElement>)}
            </div>
        </React.Fragment>
    );
}
