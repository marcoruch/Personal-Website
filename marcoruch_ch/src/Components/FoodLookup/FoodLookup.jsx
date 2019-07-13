
import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import GoogleApiWrapper from '../MapContainer/MapContainer'

import './FoodLookup.scss';



function FoodLookup() {

    const options = [
        { key: 1, text: 'Choice 1', value: 1 },
        { key: 2, text: 'Choice 2', value: 2 },
        { key: 3, text: 'Choice 3', value: 3 },
      ]

      
    const navStyles = {
        width: '30%',
        position: 'absolute',
        left: '0',
        top: '100px',
        bottom: '-100px',
    }



    const mapStyles = {
        width: '100%',

        position: 'absolute',
        left: '30%',
        top: '0',
    };

    return <div className="food-lookup">
        <div className='nav-left' style={navStyles}>
            <h1>Find the food you want.</h1>
            <h2>Choose what you want and click submit.</h2>

            <div className="filters">
                <Menu compact>
                    <Dropdown text='Dropdown' options={options} simple item />
                </Menu>
            </div>
        </div>
        <GoogleApiWrapper mapStyles={mapStyles}></GoogleApiWrapper>
    </div>
}

export default FoodLookup;