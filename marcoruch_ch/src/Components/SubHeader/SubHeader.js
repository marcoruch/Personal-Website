import React, {useState } from "react";
import './SubHeader.scss';

function SubHeader(props) {
    return (
      <div className="App-Subheader">
        <h1>{props.PageTitle}</h1>
      </div>
    );
  }


  export default SubHeader;