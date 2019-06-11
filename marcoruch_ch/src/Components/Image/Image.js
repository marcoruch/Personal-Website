import React from "react";

import {
    Form,
    Grid,
    Container,
} from 'semantic-ui-react';

function Image(props) {
   
    function handleContentChanged(e, {value}){
        props.handleContentChanged(value,props.id);
    }
    return (
        <div className="image">
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


export default Image;