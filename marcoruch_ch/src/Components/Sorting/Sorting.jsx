import React, { useState, useEffect } from 'react';
import { Image, List, Dropdown } from 'semantic-ui-react'
import BubbleSort from './Sorters/BubbleSort';
import './Sorting.scss';
import QuickSort from './Sorters/QuickSort';

export default function SortingAlgorithms() {
    const [SortingAmount, setSortingAmount] = useState(20);
    const [TimeOutVisualisationInMs, setTimeOutVisualisationInMs] = useState(100);
    const [CurrentSortingAlgorithm, setCurrentSortingAlgorithm] = useState(<React.Fragment></React.Fragment>)

    const speedOptions = [
        { key: 0, text: '25ms / Wechsel', value: 25 },
        { key: 1, text: '50ms / Wechsel', value: 50 },
        { key: 2, text: '100ms / Wechsel', value: 100 },
        { key: 3, text: '200ms / Wechsel', value: 200 },
    ]

    const amountOptions = [
        { key: 1, text: '10 Spalten', value: 10 },
        { key: 2, text: '20 Spalten', value: 20 },
        { key: 3, text: '50 Spalten', value: 50 },
        { key: 4, text: '100 Spalten', value: 100 },
    ]

    const SortImage = <Image avatar src='https://firebasestorage.googleapis.com/v0/b/marcoruchch.appspot.com/o/sort.png?alt=media&token=bbe2e157-46bd-453c-a31c-407f108ba09c' />;

    const CreateNNumberArray = (amount) => {
        var foo = new Array(amount);
        for (var i = 0; i < foo.length; i++) {
            foo[i] = i;
        }
        return foo;
    }

    const ShuffleArray = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    const CreateSortingArray = () => {
        return ShuffleArray(CreateNNumberArray(SortingAmount));
    }
    const sortingAlgorithms = {
        'bubble': { title: "Bubble Sort", Component: <BubbleSort array={CreateSortingArray()} maxNumber={SortingAmount} timeOut={TimeOutVisualisationInMs}></BubbleSort> },
        'quickSort': { title: "Quick Sort", Component: <QuickSort array={CreateSortingArray()} maxNumber={SortingAmount} timeOut={TimeOutVisualisationInMs}></QuickSort> },
    }

    return (
        <React.Fragment>
            <div className="sorting">
                <div className="sorting-header">
                    <h3>Visualisationszeit: </h3><Dropdown clearable options={speedOptions} value={TimeOutVisualisationInMs} onChange={(obj, data) => setTimeOutVisualisationInMs(data.value)} selection />
                    <h3>Visualisationsmenge: </h3><Dropdown clearable options={amountOptions} value={SortingAmount} onChange={(obj, data) => setSortingAmount(data.value)} selection />
                </div>
                <div className="sorting-algorithm-list">
                    <List horizontal relaxed>
                        {Object.keys(sortingAlgorithms).map((key) => {
                            return <List.Item>
                                {SortImage}
                                <List.Content>
                                    <List.Header as='a' onClick={() => setCurrentSortingAlgorithm(sortingAlgorithms[key].Component)}>{sortingAlgorithms[key].title}</List.Header>
                                </List.Content>
                            </List.Item>
                        })}
                    </List>
                </div>

                {CurrentSortingAlgorithm}</div>
        </React.Fragment>
    );
}
