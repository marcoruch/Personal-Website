
import React, { useState, useContext} from 'react';
import { Dropdown, Icon, Button, Input, Grid, Divider } from 'semantic-ui-react'
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
            fetch(`${API_HOST}/api/placesApiSearchLocation`, {
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
                    }

                })
                .catch(error => console.error(error));
        }, 500);
    }

    const handleLocationDropDownChange = (e, data) => {
        setGeometryLocation(data.value);
    }

    const submitPlaceSearch = () => {
        fetch(`${API_HOST}/api/placesApiSearch`, {
            method: 'post',
            body: JSON.stringify({ geometryLocation, radius }),
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
                <Button.Group>
                    {local ? <Button onClick={() => setSearchLocal(true)} inverted color='green'>Jetzige Umgebung </Button> : <Button onClick={() => setSearchLocal(true)} inverted color='grey'>Jetzige Umgebung</Button>}
                    <Button.Or />
                    {local ? <Button onClick={() => setSearchLocal(false)} inverted color='grey'>Anderer Ort</Button> : <Button inverted color='green' onClick={() => setSearchLocal(false)} >Anderer Ort</Button>}
                </Button.Group>
                <Divider inverted />
                {!local ?
                    <React.Fragment>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <Input placeholder='In Karte suchen' onChange={handleInputChanged} />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Dropdown
                                        fluid
                                        options={searchPlaceOptions}
                                        placeholder='Aus Ergebnissen auswählen'
                                        onChange={(e, data) => handleLocationDropDownChange(e, data)}
                                        search
                                        selection
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Divider inverted />
                    </React.Fragment>
                    : <React.Fragment></React.Fragment>}
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

                <Button onClick={() => submitPlaceSearch()}></Button>
            </div>
        </div>
       
        <GoogleApiWrapper mapStyles={mapStyles} ></GoogleApiWrapper>
    </div>
}

export default FoodLookup;