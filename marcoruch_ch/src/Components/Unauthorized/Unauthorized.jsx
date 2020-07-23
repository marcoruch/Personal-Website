import React from 'react';
import { Container, Button } from 'semantic-ui-react'

import "./Unauthorized.scss";
import { Link } from 'react-router-dom';


function Unauthorized(props) {
    return <Container className="unauthorized" textAlign='center'>It seems like you are not authorized to view {props.ContentName} yet.
    <br></br>
        <br></br> To get access to {props.ContentName}, please contact me first.
    <br></br>
        <br></br>
        <Link className="btn" to="/contact">
            <Button >Kontaktformular</Button>
        </Link>

    </Container>
};


export default Unauthorized;

