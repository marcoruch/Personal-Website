import React from "react";
import { Icon } from "semantic-ui-react";


import "./OfficeTetris.scss";

function RocketTracker() {
    return (
        <div className="office-tetris-holder">
            <p>
            <Icon name="warning sign"></Icon> For Testing purposes you can register yourself and enter the dummy Team with the following Credentials <Icon name="warning sign"></Icon>
            </p>
            <pre className="highlight-1">Teamname: Dummy AG</pre>
            <pre className="highlight-2">Passphrase: thankyou</pre>

            <a href="https://office-tetris.web.app/">Office-Tetris öffnen</a>
        </div>
    )
}

export default RocketTracker;