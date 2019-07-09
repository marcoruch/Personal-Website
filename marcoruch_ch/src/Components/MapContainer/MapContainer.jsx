import React, { useState, useEffect } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Loader} from 'semantic-ui-react'
import GoogleMapsAPI_config from './GoogleMapsAPI_config';

import './MapContainer.scss';
// ...

function MapContainer(props) {

    const [MyLocation, setMyLocation] = useState(null)

    const [stores, setStores] = useState([])

    useEffect(() => {
        const location = window.navigator && window.navigator.geolocation

        if (location) {
            location.getCurrentPosition((position) => {
                console.log(position);
                setMyLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                if (stores.length===0) {
                    setStores([{
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }])
                }
            }, (error) => {
                setMyLocation(null);
                console("error finding current position", error)
            })
        }
    }, [])
    
    const displayMarkers = () => {
        return stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.lat,
                lng: store.lng
            }}
                onClick={() => console.log("You clicked me!")} />
        })
    }

    return (
        MyLocation === null ? <React.Fragment></React.Fragment>
        :  <Map
                google={props.google}
                zoom={8}
                style={props.mapStyles}
                initialCenter={MyLocation}>
                {displayMarkers()}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: GoogleMapsAPI_config.key
})(MapContainer) 