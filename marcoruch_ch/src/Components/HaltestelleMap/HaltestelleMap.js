import React, { useEffect, useContext } from "react";
import "./HaltestelleMap.scss"

import { HaltestellenContext } from "../HaltestellenContext/HaltestellenContext"

import CityMap from './../../Content/img/city-map.jpg'
import LocationPin from './../../Content/img/LocationPin.png'
import LocationPinStart from './../../Content/img/LocationPinStart.png'


function HaltestelleMap() {


    const [haltestellen, setHaltestellen] = useContext(HaltestellenContext);

    useEffect(() => {
        var canvas = document.getElementById('viewport'),
            context = canvas.getContext('2d');
        context.rect(0, 0, 500, 500);
        context.clearRect(0, 0, canvas.width, canvas.height);


        haltestellen.forEach(function (haltestelle, index) {
            var img = new Image();
            img.src = index > 0 ? LocationPin : LocationPinStart;
            img.onload = function () {
                context.drawImage(img, haltestelle.x, haltestelle.y);
            }
        });


    });

    const handleClick = (e) => {
        let x = e.pageX - e.target.offsetLeft;
        let y = e.pageY - e.target.offsetTop;

        if (haltestellen.length === 0 || haltestellen.filter(haltestelle => haltestelle.winner).length > 0) {
            setHaltestellen([{ x: x, y: y }]);
        } else if (haltestellen.length === 1) {
            setHaltestellen([haltestellen[0], 1, { x: x, y: y }]);
        } else {
            let haltestellen_temp = [...haltestellen];
            haltestellen_temp[1] = haltestellen_temp[1] + 1;
            setHaltestellen([...haltestellen_temp, { x: x, y: y }]);
        }
    }
    return <div className="haltestelle-map">
        <canvas id="viewport" width="500" height="500" style={{ cursor: `url(${LocationPin}),auto` }} onClick={(e) => { handleClick(e) }}></canvas>

        <img src={CityMap} alt={CityMap}></img>
    </div>

}

export default HaltestelleMap;
