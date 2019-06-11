import React from "react";

import {
    Form,
} from 'semantic-ui-react';

function H1(props) {

    function handleContentChanged(e, { value }) {
        props.handleContentChanged(value, props.id);
    }
    return (

        <Form.Input
            fluid
            placeholder="..."
            value={props.text}
            onChange={handleContentChanged}
        />
    );
}

export default H1;