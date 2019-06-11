import React, { useState } from "react";
import { Dropdown } from 'semantic-ui-react'
import H1 from './../H1/H1';
import H2 from './../H2/H2';
import H3 from './../H3/H3';
import P from './../P/P';
import CodeBlock from './../CodeBlock/CodeBlock';
import Image from './../Image/Image';

import {
    Grid,
    Button,
} from 'semantic-ui-react';



const friendOptions = [
    { key: 'h1', text: 'Title H1', value: 'h1', icon: "h large" },
    { key: 'h2', text: 'Title H2', value: 'h2', icon: "h middle" },
    { key: 'h3', text: 'Title H3', value: 'h3', icon: "h small" },
    { key: 'p', text: 'Fliesstext', value: 'p', icon: "file text" },
    { key: 'codeBlock', text: 'CodeBlock', value: 'codeBlock', icon: "code" },
    { key: 'img', text: 'Bild', value: 'img', icon: "picture" },
]


function BlogElementChooser(props) {

    const [selectedElement, setSelectedElement] = useState(null);
    const chooserKey =props.id;

    function handleNewElementChangedSelection(e, { value }) {
        setSelectedElement(GetElementByKey(value));
    }

    function GetElementByKey(value) {
        switch (value) {
            case 'h1':
                return { type: 'h1', element: <H1 /> };
            case 'h2':

                return { type: 'h2', element: <H2 /> };
            case 'h3':
                return { type: 'h3', element: <H3 /> };
            case 'p':
                return { type: 'p', element: <P /> };
            case 'codeBlock':
                return { type: 'codeBlock', element: <CodeBlock /> };
            case 'img':
                return { type: 'image', element: <Image /> };
            default:
                return null;
        }
    }

    function handleNewElementAdded() {
        props.onAdded(GetElementByKey(selectedElement.type), chooserKey);
    }
    return (
        <React.Fragment>
            <Grid columns='sixteen' divided>
                <Grid.Row>

                    <Grid.Column width={14}>
                        <Dropdown
                            placeholder='Blogelement wählen'
                            fluid
                            selection
                            options={friendOptions}
                            onChange={handleNewElementChangedSelection}
                        />
                    </Grid.Column>

                    <Grid.Column width={2}>
                        <Button className={selectedElement ? '' : 'disabled'} icon='plus' onClick={handleNewElementAdded}></Button>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </React.Fragment>

    )
}

export default BlogElementChooser