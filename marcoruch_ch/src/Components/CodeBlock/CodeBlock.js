import React from "react";

import {
    Form,
    Grid,
    Container, TextArea
} from 'semantic-ui-react';


function CodeBlock(props) {
    function handleContentChanged(e, { value }) {
        props.handleContentChanged(value, props.id);
    }
    return (
        <div className="code-block">
            <Container textAlign='center'>
                <Grid centered columns={1}>
                    <Grid.Column width={16}>
                    <Form>
                    <TextArea width={14}
                            fluid
                            placeholder="..."
                            value={props.text}
                            onChange={handleContentChanged}
                        />
                          </Form>
                    </Grid.Column>
                </Grid>


            </Container>

        </div>
    );
}


export default CodeBlock;