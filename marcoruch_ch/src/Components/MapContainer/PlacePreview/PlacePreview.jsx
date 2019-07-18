import React, { useState, useEffect } from 'react';
import './PlacePreview.scss';
import { Loader } from 'semantic-ui-react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import API_HOST from '../../../environment';


function PlacePreview(props) {
    const [PlaceDetails] = useState(props.place);
    const [PhotoUrl, setPhotoUrl] = useState(null)
    const [PlaceFurtherDetails, setPlaceFurtherDetails] = useState(null);
    const [PlaceFurtherPhotos, setPlaceFurtherPhotos] = useState(null);

    useEffect(() => {
        (async() => {
            console.log(PlaceDetails);
            if (PlaceDetails && PlaceDetails.photos && PlaceDetails.photos[0]){
                await Promise.all([await getGooglePhotoByPhotoDetail(PlaceDetails.photos[0]).then((data)=>{
                    console.log("Place front foto-url...",data);
                    setPhotoUrl(data);
                }), await getPlaceDetails(PlaceDetails.place_id).then(async(data)=>{
                    console.log("Place further Details...",data);
                    setPlaceFurtherDetails(data);
                    const photos =[];
                    await Promise.all(data.photos.forEach((photo, index) => {
                            return getGooglePhotoByPhotoDetail(photo).then((data)=>{
                                console.log("Further foto-url...",data);
                                photos.push(data);
                            });
                        }));
                    setPlaceFurtherPhotos(photos);
                })]);
            } else if (PlaceDetails) {
                setPhotoUrl("None");
                await getPlaceDetails(PlaceDetails.place_id).then((data)=>{
                    console.log("Place further Details...",data);
                    setPlaceFurtherDetails(data);
                })
            }else {
                setPhotoUrl(null);
            } 
        })()
    }, [PlaceDetails])

    const picStyle = {
        height: "300px"
    }

    const getPlaceDetails = async (placeId) => {
        let placeDetails;
        await fetch(`${API_HOST}/api/placesApiGetPlaceDetails`, {
            method: 'POST',
            body: JSON.stringify({ id: placeId }),
            headers: { 'Content-type': 'application/json' }
        }).then(response => response.json())
        .then(data => {
                if (data.status === "OK") {
                    placeDetails= data.result;
                }
        })
        .catch(error => {
                console.error(error);
        });
        return placeDetails;
    }

    const getGooglePhotoByPhotoDetail = async (photoDetails) => {
        let pictureUrl;
        await fetch(`${API_HOST}/api/placesApiGetImageUrl`, {
            method: 'POST',
            body: JSON.stringify({ photoDetails }),
            headers: { 'Content-type': 'application/json' }
        }).then(response => response.json())
        .then(data => {
                if (data.status === "OK") {
                    pictureUrl= data.url;
                }
        })
        .catch(error => {
                console.error(error);
        });
        return pictureUrl;
    }

    const handleCloseCall = () => {
        props.handleCloseCall();
    
    }
    const handleOnDragStart = e => e.preventDefault()

    return (<div className="preview-box">
        <div className="header">
            <div id="hamburger-in-nav-holder" onClick={handleCloseCall}>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
            </div>
        </div>
        { PhotoUrl !== "None" &&
        <div>
            { PhotoUrl === "None"
            ? <div className="imageHolder"><img style={picStyle}  src={PhotoUrl} alt={PhotoUrl}  /></div>
            : <div className="imageHolder" style={picStyle}><Loader active inline="centered" /></div>}
        </div>}
        <AliceCarousel mouseDragEnabled >
            {PlaceFurtherPhotos && PlaceFurtherPhotos
            .map((photoUrl, index)=><img key={index} src={photoUrl} alt={photoUrl} onDragStart={handleOnDragStart} />)}
            
        </AliceCarousel>
    </div>)
}


export default PlacePreview;