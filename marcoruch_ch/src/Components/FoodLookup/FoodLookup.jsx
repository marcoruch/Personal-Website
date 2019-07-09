
import React, { useState, useEffect } from 'react';
import {  Form, Button, Checkbox, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import firebase from './../Firebase/Firebase'
import GoogleApiWrapper from '../MapContainer/MapContainer'

import './FoodLookup.scss';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

function FoodLookup() {

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
        <div className='nav-left' style={navStyles}></div>
        <GoogleApiWrapper mapStyles={mapStyles}></GoogleApiWrapper>
    </div>
}

export default FoodLookup;