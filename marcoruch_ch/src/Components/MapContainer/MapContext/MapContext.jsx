import React, { useState, createContext } from "react";



export const MapContext = createContext();



export const MapProvider = props => {
  const [positions, setPositions] = useState([]);
  const [myLocation, setMyLocation] = useState(null);
  return (
    <MapContext.Provider value={[positions, setPositions,myLocation, setMyLocation]}>
      {props.children}
    </MapContext.Provider>
  );
};
