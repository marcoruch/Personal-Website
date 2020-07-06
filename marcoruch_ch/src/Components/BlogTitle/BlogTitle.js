import React from "react";
import './BlogTitle.scss'

import {
    Form,
    Grid,
} from 'semantic-ui-react';


function BlogTitle(props) {

    function handleTitleChange(e, { value }) {
        props.handleTitleChange(value);
    }
    return (
        <div className="blog-title">

            <Grid centered columns={1}>
                <Grid.Column>
                    <Form size="large">
                        <Form.Input

                            fluid
                            icon="file alternate"
                            iconPosition="left"
                            placeholder="Dokumenttitel"
                            value={props.title}
                            onChange={handleTitleChange} />
                    </Form>
                </Grid.Column>
            </Grid>


        </div>
    );
}

export default BlogTitle;