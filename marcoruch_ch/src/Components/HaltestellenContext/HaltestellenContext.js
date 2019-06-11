import React, { useState, createContext } from "react";



export const HaltestellenContext = createContext();



export const HaltestellenProvider = props => {

  const [haltestellen, setHaltestellen] = useState([]);
  return (
    <HaltestellenContext.Provider value={[haltestellen, setHaltestellen]}>
      {props.children}
    </HaltestellenContext.Provider>
  );
};
