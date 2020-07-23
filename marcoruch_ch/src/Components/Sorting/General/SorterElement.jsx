import React from 'react';
import './SorterElement.scss'

export default function SorterElement({ number, maxNumber, state, width }) {

    const GetStyleByState = (key) => {
        switch (key) {
            case 'activeFrom':
                return { backgroundColor: 'red' }
            case 'activeTo':
                return { backgroundColor: 'green' }
            default:
                return {};
        }
    }


    return (
        <div className='sorterElement' style={{ ...GetStyleByState(state), width: width, height: (window.innerHeight * 0.6 * number / maxNumber + 20) }}> { maxNumber > 50 ? '' : number }</div >
    );
}
