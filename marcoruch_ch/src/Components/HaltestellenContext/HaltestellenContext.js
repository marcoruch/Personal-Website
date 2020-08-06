import React, { useState, createContext } from "react";



export const HaltestellenContext = createContext();



export const HaltestellenProvider = props => {

  const [haltestellen, setHaltestellen] = useState([]);
  const [winnerCoords, setWinnerCoords] = useState([]);
  return (
    <HaltestellenContext.Provider value={[haltestellen, setHaltestellen, winnerCoords, setWinnerCoords]}>
      {props.children}
    </HaltestellenContext.Provider>
  );
};
