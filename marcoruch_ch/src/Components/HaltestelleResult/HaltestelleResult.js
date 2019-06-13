import React, { useEffect, useState, useContext } from "react";
import { Form, Loader } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import "./HaltestelleResult.scss"

import { HaltestellenContext } from "../HaltestellenContext/HaltestellenContext"


function HaltestelleResult() {


    const [haltestellen, setHaltestellen] = useContext(HaltestellenContext);

    const [nearestHaltestelle, setNearestHaltestelle] = useState(null);
    const [nearestDistance, setNearestDistance] = useState(null);

    const  getDistance = (coord_one, coord_two) => {
        let X_one = coord_one.x;
        let Y_one = coord_one.y;

        let X_two = coord_two.x;
        let Y_two = coord_two.y;

        let delta_X = Math.abs(X_one > X_two ? X_one - X_two : X_two - X_one);
        let delta_Y = Math.abs(Y_one > Y_two ? Y_one - Y_two : Y_two - Y_one);
        let distance = Math.sqrt(delta_X ^ 2 + delta_Y ^ 2);

        return distance;
    }

    const handleCalculateHaltestelle = () => {

        console.log(haltestellen);
        if (haltestellen.length <=2 ) {
            Swal.fire('Ups...', `Geben Sie mindestens zwei Haltestellen an.`, 'error')
            setNearestHaltestelle(null);
            setNearestDistance(null);
        } else {
            const from_geo_point = haltestellen[0];
            const geo_points = haltestellen[1];
            var nearest_geo_point = haltestellen[2]
            var nearest_distance = getDistance(from_geo_point, haltestellen[2]);
    
            for (let index = 3; index < geo_points + 2; index++) {
                let to_geo_point = haltestellen[index];
    
                let new_distance = getDistance(from_geo_point, to_geo_point);
    
                
                if (new_distance < nearest_distance) {
                    nearest_geo_point = to_geo_point;
                    nearest_distance = new_distance;
                }
    
            }
            nearest_geo_point.winner = true;
            setNearestHaltestelle(nearest_geo_point);
        }
        
    }

  
    return <div className="haltestelle-result">
        
        <h5 className="halte-stellen-counter">Haltestellen: {haltestellen.length >= 3 ? haltestellen.length - 2 : 0 }</h5>
        <Form.Button floated='right' onClick={() => handleCalculateHaltestelle()} >Berechnen</Form.Button>
        {nearestHaltestelle
            ? <div className="result-text">
                <h3>
                    Die näheste Haltestelle ist:
                </h3>
                <p>X: {nearestHaltestelle.x}</p>
                <p>Y: {nearestHaltestelle.y}</p>
                </div>
            : <div></div>  } 

        </div>

}

export default HaltestelleResult;
