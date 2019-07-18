
import React, { useState, useContext } from 'react';
import { Dropdown, Icon, Button, Input, Grid, Divider, Label } from 'semantic-ui-react'
import GoogleApiWrapper from '../MapContainer/MapContainer'
import { MapContext } from "../MapContainer/MapContext/MapContext"


import API_HOST from '../../environment';
import './FoodLookup.scss';

let inputChanged;

function FoodLookup() {

    const [rating, setRating] = useState(null);
    const [local, setLocal] = useState(true);
    const [geometryLocation, setGeometryLocation] = useState(null);
    const [searchPlaceOptions, setSearchPlaceOptions] = useState([{}]);
    const [radius, setRadius] = useState(1500);
    const [positions, setPositions, myLocation, setMyLocation] = useContext(MapContext)
    const [openFrom, setOpenFrom] = useState(0);
    const [openTo, setOpenTo] = useState(2400);
    const [pricing, setPricing] = useState(null);
    const [searching, setSearching] = useState(false);

    const openingHoursOptions = [
        { key: 30, value: 30, text: '00:30' },
        { key: 100, value: 100, text: '01:00' },
        { key: 130, value: 130, text: '01:30' },
        { key: 200, value: 200, text: '02:00' },
        { key: 230, value: 230, text: '02:30' },
        { key: 300, value: 300, text: '03:00' },
        { key: 330, value: 330, text: '03:30' },
        { key: 400, value: 400, text: '04:00' },
        { key: 430, value: 430, text: '04:30' },
        { key: 500, value: 500, text: '05:00' },
        { key: 530, value: 530, text: '05:30' },
        { key: 600, value: 600, text: '06:00' },
        { key: 630, value: 630, text: '06:30' },
        { key: 700, value: 700, text: '07:00' },
        { key: 730, value: 730, text: '07:30' },
        { key: 800, value: 800, text: '08:00' },
        { key: 830, value: 830, text: '08:30' },
        { key: 900, value: 900, text: '09:00' },
        { key: 930, value: 930, text: '09:30' },
        { key: 1000, value: 1000, text: '10:00' },
        { key: 1030, value: 1030, text: '10:30' },
        { key: 1100, value: 1100, text: '11:00' },
        { key: 1130, value: 1130, text: '11:30' },
        { key: 1200, value: 1200, text: '12:00' },
        { key: 1230, value: 1230, text: '12:30' },
        { key: 1300, value: 1300, text: '13:00' },
        { key: 1330, value: 1330, text: '13:30' },
        { key: 1400, value: 1400, text: '14:00' },
        { key: 1430, value: 1430, text: '14:30' },
        { key: 1500, value: 1500, text: '15:00' },
        { key: 1530, value: 1530, text: '15:30' },
        { key: 1600, value: 1600, text: '16:00' },
        { key: 1630, value: 1630, text: '16:30' },
        { key: 1700, value: 1700, text: '17:00' },
        { key: 1730, value: 1730, text: '17:30' },
        { key: 1800, value: 1800, text: '18:00' },
        { key: 1830, value: 1830, text: '18:30' },
        { key: 1900, value: 1900, text: '19:00' },
        { key: 1930, value: 1930, text: '19:30' },
        { key: 2000, value: 2000, text: '20:00' },
        { key: 2030, value: 2030, text: '20:30' },
        { key: 2100, value: 2100, text: '21:00' },
        { key: 2130, value: 2130, text: '21:30' },
        { key: 2200, value: 2200, text: '22:00' },
        { key: 2230, value: 2230, text: '22:30' },
        { key: 2300, value: 2300, text: '23:00' },
        { key: 2330, value: 2330, text: '23:30' },
        { key: 2400, value: 2400, text: '24:00' },
    ]

    const priceOptions = [
        { key: 0, text: 'Free', value: 0 },
        { key: 1, text: 'Inexpensive', value: 1 },
        { key: 2, text: 'Moderate', value: 2 },
        { key: 3, text: 'Expensive', value: 3 },
        { key: 4, text: 'Very Expensive', value: 4 },
    ]
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
    const handleOpenFromSelected = (e, data) => {
        setOpenFrom(data.value);
    }

    const handleOpenToSelected = (e, data) => {
        setOpenTo(data.value);
    }

    const handlePriceOptionsChanged = (e, data) => {
        setPricing(data.value);
    }
    const setSearchLocal = (searchLocal) => {
        setLocal(searchLocal);
    }

    const getStars = (starAmount) => {
        const fullStars = Math.floor(starAmount);
        const halfStars = starAmount - fullStars;
        const stars = Array(fullStars).fill(<Icon name="star"></Icon>);
        if (halfStars > 0) stars.push(<Icon name="star half"></Icon>)
        return stars;
    }


    const handleInputChanged = async (event, data) => {
        clearTimeout(inputChanged);

        inputChanged = setTimeout(async () => {
            setSearching(true);
            await fetch(`${API_HOST}/api/placesApiSearchLocation`, {
                method: 'POST',
                body: JSON.stringify({ queryText: escape(data.value) }),
                headers: { 'Content-type': 'application/json' }
            }).then(response => response.json())
                .then(data => {
                    if (data.status === "OK") {
                        let newFoundOptions = [];
                        data.results.forEach((dataResult, i) => newFoundOptions.push({ key: i, text: dataResult.formatted_address, value: dataResult.geometry.location }));
                        setSearchPlaceOptions(newFoundOptions);
                        console.log("New Dropdown Options loaded..", newFoundOptions);
                        setSearching(false);
                    }
                })
                .catch(error => {
                    console.error(error);
                    setSearching(false);
                });
        }, 500);
    }

    const handleLocationDropDownChange = (e, data) => {
        setGeometryLocation(data.value);
    }

    const submitPlaceSearch = () => {
        fetch(`${API_HOST}/api/placesApiSearch`, {
            method: 'post',
            body: JSON.stringify(
                {
                    geometryLocation: geometryLocation ? geometryLocation : myLocation,
                    radius,
                    pricing,
                    openFrom,
                    openTo
                }),
            headers: { 'Content-type': 'application/json' }
        }).then(response => response.json())
            .then(data => {
                if (data.status === "OK") {
                    let newFoundResults = [];
                    data.results.forEach((dataResult, i) => newFoundResults.push(dataResult));
                    setPositions(newFoundResults);
                    console.info("New DataResult:", newFoundResults);
                }

            })
            .catch(error => console.error(error));
    }



    return <div className="food-lookup">
        <div className='nav-left' style={navStyles}>
            <h1>Find the food you want.</h1>
            <h2>Choose what you want and click submit.</h2>

            <div className="filters">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Button.Group>
                                {local ? <Button onClick={() => setSearchLocal(true)} inverted color='green'>Jetzige Umgebung </Button> : <Button onClick={() => setSearchLocal(true)} inverted color='grey'>Jetzige Umgebung</Button>}
                                <Button.Or />
                                {local ? <Button onClick={() => setSearchLocal(false)} inverted color='grey'>Anderer Ort</Button> : <Button inverted color='green' onClick={() => setSearchLocal(false)} >Anderer Ort</Button>}
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {!local ?
                    <React.Fragment>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Input placeholder='In Karte suchen' onChange={handleInputChanged} />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    {searching ?
                                        <Dropdown
                                            fluid
                                            options={searchPlaceOptions}
                                            placeholder='Aus Ergebnissen auswählen'
                                            onChange={(e, data) => handleLocationDropDownChange(e, data)}
                                            search
                                            selection
                                            loading
                                        /> :
                                        <Dropdown
                                            fluid
                                            options={searchPlaceOptions}
                                            placeholder='Aus Ergebnissen auswählen'
                                            onChange={(e, data) => handleLocationDropDownChange(e, data)}
                                            search
                                            selection
                                        />}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </React.Fragment>
                    : <React.Fragment></React.Fragment>}

                <Divider inverted />
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
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
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Dropdown
                                placeholder='Preisklasse'
                                fluid
                                selection
                                options={priceOptions}
                                onChange={handlePriceOptionsChanged}
                            />
                        </Grid.Column>
                        <Grid.Column width={8}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider inverted />
                <Label color='brown' horizontal>Öffnungszeiten</Label>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Dropdown
                                placeholder='Verfügbar ab'
                                fluid
                                selection
                                options={openingHoursOptions}
                                onChange={handleOpenFromSelected}
                            />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Dropdown
                                placeholder='Verfügbar bis'
                                fluid
                                selection
                                options={openingHoursOptions}
                                onChange={handleOpenToSelected}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


                <Divider inverted />
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>

                        </Grid.Column>
                        <Grid.Column width={8}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Divider inverted />
                <Button floated="right" onClick={() => submitPlaceSearch()}>Orte suchen!</Button>
            </div>
        </div>

        <GoogleApiWrapper mapStyles={mapStyles} ></GoogleApiWrapper>
    </div>
}

export default FoodLookup;