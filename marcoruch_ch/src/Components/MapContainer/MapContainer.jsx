import React, { useState, useEffect, useContext } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import GoogleMapsAPI_config from './GoogleMapsAPI_config';
import { MapContext } from "./MapContext/MapContext"
import PlacePreview from "./PlacePreview/PlacePreview";

import './MapContainer.scss';
// ...

function MapContainer(props) {

    const [positions, setPositions, myLocation, setMyLocation] = useContext(MapContext)
    const [centerLocation, setCenterLocation] = useState(null);
    const [currentClickedMarker, setCurrentClickedMarker] = useState(null)

    useEffect(() => {
            const location = window.navigator && window.navigator.geolocation
            if (location) {
                location.getCurrentPosition((position) => {
                    console.log({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setMyLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                    // on error
                }, (error) => {
                    setMyLocation(null);
                    console("error finding current position", error)
                })
            }
        if (positions.length > 0) {

            setCurrentAverageGeolocation(positions.map(item => item.geometry.location));
        }
    }, [positions])

    const averageGeolocation = (coords) => {
        if (coords.length === 1) {
            return coords[0];
        }

        let x = 0.0;
        let y = 0.0;
        let z = 0.0;

        for (let coord of coords) {
            let latitude = coord.lat * Math.PI / 180;
            let longitude = coord.lng * Math.PI / 180;

            x += Math.cos(latitude) * Math.cos(longitude);
            y += Math.cos(latitude) * Math.sin(longitude);
            z += Math.sin(latitude);
        }

        let total = coords.length;

        x = x / total;
        y = y / total;
        z = z / total;

        let centralLongitude = Math.atan2(y, x);
        let centralSquareRoot = Math.sqrt(x * x + y * y);
        let centralLatitude = Math.atan2(z, centralSquareRoot);

        return {
            lat: centralLatitude * 180 / Math.PI,
            lng: centralLongitude * 180 / Math.PI
        };
    }

    const setCurrentAverageGeolocation = (coords) => {
        const avgGeo = averageGeolocation(coords);
        console.log("New average GeoLocation: ", avgGeo);
        setCenterLocation(avgGeo);
    }


    const handleClickedMarker = (placeData) => {
        setCurrentClickedMarker(null);
        setCurrentClickedMarker(placeData);
    }

    const handleCloseCall = () => {
        setCurrentClickedMarker(null);
    }

    const displayMarkers = () => {
        return positions.map((item, index) => {
            return (<Marker key={index}
                title={item.name}
                name={item.name}
                position={{ lat: item.geometry.location.lat, lng: item.geometry.location.lng }}
                onClick={() => handleClickedMarker(item)}/>)
        })
    }


    return (<React.Fragment>{myLocation !== null && <Map
        google={props.google}
        zoom={positions.length > 0 ? 14 : 10}
        style={props.mapStyles}
        initialCenter={myLocation}
        center={centerLocation ? centerLocation : myLocation}>
        {displayMarkers()}
    </Map>}
    {currentClickedMarker && <PlacePreview handleCloseCall={handleCloseCall} place={currentClickedMarker}/>}
    </React.Fragment>
    );
}

export default GoogleApiWrapper({
    apiKey: GoogleMapsAPI_config.key
})(MapContainer) 