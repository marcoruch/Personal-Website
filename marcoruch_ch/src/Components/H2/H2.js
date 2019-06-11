import React from "react";

import {
    Form,
    Grid,
    Container,
} from 'semantic-ui-react';


function H2(props) {
    function handleContentChanged(e, {value}){
        props.handleContentChanged(value,props.id);
    }
    return (
        <div className="h2">
            <Container textAlign='center'>
                <Grid centered columns={1}>
                        <Grid.Column width={16}>
                                <Form.Input
                                fluid
                                placeholder="..."
                                value={props.text}
                                onChange={handleContentChanged}
                            />
                        </Grid.Column>
                    </Grid>
            </Container>

        </div>
    );
}


export default H2;