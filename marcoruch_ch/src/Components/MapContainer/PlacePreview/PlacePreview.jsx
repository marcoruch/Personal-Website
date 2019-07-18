import React, { useState, useEffect } from 'react';
import './PlacePreview.scss';
import { Loader, Divider, Icon } from 'semantic-ui-react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import API_HOST from '../../../environment';


function PlacePreview(props) {
    const [PlaceDetails] = useState(props.place);
    const [PhotoUrl, setPhotoUrl] = useState(null)
    const [PlaceFurtherDetails, setPlaceFurtherDetails] = useState(null);
    const [PlaceFurtherPhotos, setPlaceFurtherPhotos] = useState(null);
    const [activeItemIndex, setactiveItemIndex] = useState(0)

    const carouselImgStyle = { cursor: 'pointer', maxWidth: "80%", maxHeight: "200px", alignSelf: "center" };
    useEffect(() => {


        if (PlaceDetails && PlaceDetails.photos && PlaceDetails.photos[0]) {
            getGooglePhotoByPhotoDetail(PlaceDetails.photos[0]).then((data) => {
                console.log("Place front photo-url...", data);
                setPhotoUrl(data);
            });

            getPlaceDetails(PlaceDetails.place_id).then(async (data) => {
                console.log("Place further Details...", data);
                setPlaceFurtherDetails(data);
                const photos = [];
                await Promise.all(data.photos.map(async (photo) => {
                    await getGooglePhotoByPhotoDetail(photo).then((data) => {
                        console.log("Further photo-url resolved...", data);
                        photos.push(data);
                    });
                }));
                console.log("New Resolved photo urls", photos);
                setPlaceFurtherPhotos(photos);
            });
        } else if (PlaceDetails) {
            setPhotoUrl(null);
            getPlaceDetails(PlaceDetails.place_id).then((data) => {
                console.log("Place further Details...", data);
                setPlaceFurtherDetails(data);
            })
        } else {
            setPhotoUrl(null);
        }
    }, [PlaceDetails])

    const picStyle = {
        height: "300px",
        maxWidth: '100%'
    }

    const getStars = (starAmount) => {
        const fullStars = Math.floor(starAmount);
        const halfStars = starAmount - fullStars;
        const stars = Array(fullStars).fill(<Icon name="star"></Icon>);
        if (halfStars > 0) stars.push(<Icon name="star half"></Icon>)
        return stars;
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
                    placeDetails = data.result;
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
                    pictureUrl = data.url;
                }
            })
            .catch(error => {
                console.error(error);
            });
        return pictureUrl;
    }

    const changeActiveItem = (index) => setactiveItemIndex(index);


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
        <div className="header-picture">
            {PhotoUrl !== null
                ? <div className="imageHolder"><img href={PhotoUrl} style={picStyle} src={PhotoUrl} alt={PhotoUrl} /></div>
                : <div className="imageHolder" style={picStyle}><Loader active inline="centered" /></div>}
        </div>
        {PlaceFurtherDetails &&
            <React.Fragment>
                <Divider />
                <div className="metaInfo">
                    {PlaceFurtherDetails.name && <h1>{`${PlaceFurtherDetails.name}`}</h1>}
                    {PlaceFurtherDetails.rating && <h1>{getStars(parseInt(PlaceFurtherDetails.rating))}</h1>}
                    {PlaceFurtherDetails.formatted_phone_number && <p>Telephone: {`${PlaceFurtherDetails.formatted_phone_number}`}</p>}
                </div>
            </React.Fragment>
        }

        {PlaceFurtherPhotos &&
            <React.Fragment>
                <Divider />
                <AliceCarousel autoPlayInterval={3000} autoPlay={true} mouseDragEnabled={true}>
                    {PlaceFurtherPhotos
                        .map((photoUrl, index) =>
                            <div style={{ width: "100%", height: '200px', display: "flex", flexDirection: 'column', justifyContent: "center", alignContent: 'center', alignItems: 'center', }}>
                                <img key={index} href={photoUrl} style={carouselImgStyle} src={photoUrl} alt={photoUrl} onDragStart={handleOnDragStart} />
                            </div>)}
                </AliceCarousel>
            </React.Fragment>}
    </div>)
}


export default PlacePreview;