
import React, { useState } from 'react';
import { Dropdown,  Icon, Button } from 'semantic-ui-react'
import GoogleApiWrapper from '../MapContainer/MapContainer'

import './FoodLookup.scss';



function FoodLookup() {

    const [rating, setRating] = useState(null);
    const [local, setLocal] = useState(true);
    const [searchPlaceOptions, setSearchPlaceOptions] = useState({});

    const starOptions = [
        { key: 1, value: 1 },
        { key: 2, value: 1.5 },
        { key: 3, value: 2 },
        { key: 4, value: 2.5 },
        { key: 5, value: 3 },
        { key: 6, value: 3.5 },
        { key: 7, value: 4 },
        { key: 8, value: 4.5 },
        { key: 9, value: 5 },
    ]


    const handleLazyLoadingDropDownInputChanged = (options, inputQuery) => {
        console.log(inputQuery)
        const newFoundOptions = {};
        setSearchPlaceOptions(newFoundOptions);
        return options.filter(opt => true)
    }



    const navStyles = {
        width: '30%',
        position: 'absolute',
        left: '0',
        top: '100px',
        bottom: '-100px',
        zIndex: 1000,
    }



    const mapStyles = {
        width: '100%',

        position: 'absolute',
        left: '30%',
        top: '0',
        zIndex: 999,
    };

    const optionsStyle = {
        display: 'flex',
        flexDirection: 'row'
    }

    const optionsLabelStyle = { textAlign: 'center', width: '25px', marginRight: '10px' }
    const handleRatingSelected = (stars) => {
        if (stars !== rating) {
            setRating(stars)
        }
    }
    const setSearchLocal = (searchLocal) => {
        setLocal(searchLocal);
    }

    const getStars = (starAmount) => {
        const fullStars = Math.floor(starAmount);
        const halfStars = starAmount - fullStars;
        const stars = Array(fullStars).fill(<Icon name="star"></Icon>);
        if (halfStars > 0) stars.push(<Icon name="star half"></Icon>)
        console.log(stars);
        return stars;
    }

    return <div className="food-lookup">
        <div className='nav-left' style={navStyles}>
            <h1>Find the food you want.</h1>
            <h2>Choose what you want and click submit.</h2>

            <div className="filters">
                <Button.Group>
                    {local ? <Button onClick={() => setSearchLocal(true)} inverted color='green'>Jetzige Umgebung </Button> : <Button onClick={() => setSearchLocal(true)} color='red'>Jetzige Umgebung</Button>}
                    <Button.Or />
                    {local ? <Button onClick={() => setSearchLocal(false)} inverted color='red'>Anderer Ort</Button> : <Button color='green' onClick={() => setSearchLocal(false)} >Anderer Ort</Button>}
                </Button.Group>
                {!local ? <Dropdown
                    fluid
                    options={searchPlaceOptions}
                    placeholder='Try to search for case or CASE'
                    search={handleLazyLoadingDropDownInputChanged}
                    selection
                /> : <React.Fragment></React.Fragment>}
                <Dropdown text={rating ? `Mindestens ${rating} Sterne` : "Mindestbewertung"} icon='star' floating labeled button className='icon'>
                    <Dropdown.Menu>
                        <Dropdown.Header icon='google' content='1-5 Sterne' />
                        <Dropdown.Divider />
                        {starOptions.map(starOption =>
                            <Dropdown.Item
                                text={<div
                                    style={optionsStyle}><div
                                        style={optionsLabelStyle}>{starOption.value}</div>
                                    {getStars(starOption.value).map(star => star)}</div>} onClick={() => handleRatingSelected(starOption.value)} />)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        <GoogleApiWrapper mapStyles={mapStyles}></GoogleApiWrapper>
    </div>
}

export default FoodLookup;