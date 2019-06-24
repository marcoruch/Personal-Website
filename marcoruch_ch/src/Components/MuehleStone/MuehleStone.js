import React from "react";
import "./MuehleStone.scss"
function MuehleStone(props) {

    return (
        <div className="stone" style={{backgroundColor: props.color}}>
            {props.key}
        </div>
    )
}

export default MuehleStone;