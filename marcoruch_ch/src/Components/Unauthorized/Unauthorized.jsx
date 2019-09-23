import React from 'react';
import { Container } from 'semantic-ui-react'

import "./Unauthorized.scss";


function Unauthorized(props) {
    return <Container className="unauthorized" textAlign='center'>It seems like you are not authorized to view {props.ContentName} yet.</Container>
};


export default Unauthorized;

