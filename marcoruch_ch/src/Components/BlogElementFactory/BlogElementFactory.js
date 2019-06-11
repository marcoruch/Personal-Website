import React from "react";
import Highlight from 'react-highlight'




export function GetElementByElement(contentObject, index) {
    switch (contentObject.type) {
        case 'h1':
            return <h1>{contentObject.text}</h1>;
        case 'h2':

            return <h2>{contentObject.text}</h2>;
        case 'h3':
            return <h3>{contentObject.text}</h3>;
        case 'p':
            return <p>{contentObject.text}</p>;
        case 'codeBlock':
            return <Highlight language="javascript">
            {`${contentObject.text}`}
          </Highlight>;
        case 'img':
            return <img src={contentObject.text} alt="hey"></img>;
        default:
            return null;
    }
}