import React, { useState } from "react";
import firebase from './../Firebase/Firebase';
import BlogElementChooser from './../BlogElementChooser/BlogElementChooser';
import BlogTitle from './../BlogTitle/BlogTitle';
import BlogTags from './../BlogTags/BlogTags';
import H1 from './../H1/H1';
import H2 from './../H2/H2';
import H3 from './../H3/H3';
import P from './../P/P';
import CodeBlock from './../CodeBlock/CodeBlock';
import Image from './../Image/Image';
import { ArrayContains } from './../Utilities/Utitlities'


import './CreateBlog.scss';

import {
    Button,
    Grid,
    Segment,
    Container,
} from 'semantic-ui-react';



function CreateBlog() {

    // user
    const [user, setUser] = useState(null);

    // doc
    const [title, setTitle] = useState("New Document");
    const [tags, setTags] = useState([]);
    const [createDate, setCreateDate] = useState(new Date());
    const [updateDate, setUpdateDate] = useState(new Date());
    const [content, setContent] = useState([]);

    firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
    });



    function handleContentAdded(newElement, chooserKey) {

        setUpdateDate(new Date());
        let newContent = [];

        if (content.length === 0) {
            newElement.id = 0;
            newContent.push(newElement);
            setContent(newContent);
            return;
        }

        var pushedNew = false;
        var realIndex = 0;
        for (let index = 0; index < content.length + 1; index++) {
            if (chooserKey === index && content[index]) {
                newElement.id = realIndex;
                newContent.push(newElement);
                realIndex++;
                pushedNew = true;
                let elem = content[index];
                elem.id = realIndex;
                newContent.push(elem);
            } else if (content[index]) {
                let elem = content[index];
                elem.id = realIndex;
                newContent.push(content[index]);
            } else if (!pushedNew) {
                newElement.id = realIndex;
                newContent.push(newElement);
            }
        }

        setContent(newContent);
    }



    function handleTitleChange(value) {
        setTitle(value);
    }

    function handleTagChange(value) {
        setTags(value);
    }



    function handleContentChanged(itemValue, itemIndex) {
        let newContent = [];
        for (let index = 0; index < content.length; index++) {
            const element = content[index];

            if (index === itemIndex) {
                element.text = itemValue;
            }
            newContent.push(element);
        }
        setContent(newContent);
    }

    function handleRemoveElement() {

    }

    function GetElementByElement(contentObject, index) {
        switch (contentObject.type) {
            case 'h1':
                return <H1 id={index} type={contentObject.type} text={contentObject.text} handleContentChanged={handleContentChanged} />;
            case 'h2':
                return <H2 id={index} type={contentObject.type} text={contentObject.text} handleContentChanged={handleContentChanged} />;
            case 'h3':
                return <H3 id={index} type={contentObject.type} text={contentObject.text} handleContentChanged={handleContentChanged} />;
            case 'p':
                return <P id={index} type={contentObject.type} text={contentObject.text} handleContentChanged={handleContentChanged} />;
            case 'codeBlock':
                return <CodeBlock id={index} type={contentObject.type} text={contentObject.text} handleContentChanged={handleContentChanged} />;
            case 'img':
                return <Image id={index} type={contentObject.type} text={contentObject.text} handleContentChanged={handleContentChanged} />;
            default:
                return null;
        }
    }

    async function handleDocumentSave() {
        setCreateDate(new Date());
        setUpdateDate(new Date());

        var firebaseBlogContent = content.map(function (item) {
            delete item.element;
            return item;
        });

        firebase.firestore().collection(user.uid).add({
            'title': title,
            'tags': tags,
            'createDate': createDate,
            'updateDate': updateDate,
            'content': firebaseBlogContent,
        }).then(function () {
            console.log("Document successfully written!");
        })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

        let uids = await firebase.firestore().collection("blogUsers").doc("userUids").get().then(document => document.data().uids);
        if (!ArrayContains(uids, user.uid)) {
            uids.push(user.uid);
            firebase.firestore().collection("blogUsers").doc("userUids").set({
                uids: uids
            })
        };
    }

    return (
        document == null
            ? <div></div>
            : <div className="create-blog">
                <Container textAlign='center'>
                    <Segment>
                        <Grid columns='sixteen'>
                            <Grid.Column width={16}><BlogTitle title={title} handleTitleChange={handleTitleChange}></BlogTitle></Grid.Column> 
                            <Grid.Column width={16}><BlogTags tags={tags} handleTagChange={handleTagChange}></BlogTags></Grid.Column> 
                        </Grid>
                        
                        
                    </Segment>
                    <Segment>
                        <Container textAlign='center'>
                            <Grid columns='sixteen'>
                                <Grid.Column width={2}>   <div></div>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <BlogElementChooser id={0} onAdded={handleContentAdded}></BlogElementChooser>
                                </Grid.Column>
                                <Grid.Column width={2}>   <div></div>
                                </Grid.Column>
                            </Grid>
                        </Container>

                        {content.map((contentObject, index) =>
                            <div>
                                <Container textAlign='center'>
                                    <Grid columns='sixteen'>
                                        <Grid.Column width={2}>
                                            <h3>{contentObject.type}</h3>
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            <React.Fragment>
                                                <Grid columns='sixteen' divided>
                                                    <Grid.Row>
                                                        <Grid.Column width={14}>
                                                            {GetElementByElement(contentObject, index)}
                                                        </Grid.Column>
                                                        <Grid.Column width={2}>
                                                            <Button icon='minus' onClick={handleRemoveElement}></Button>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </React.Fragment>

                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <div></div>
                                        </Grid.Column>
                                    </Grid>
                                </Container>
                                <Container textAlign='center'>
                                    <Grid columns='sixteen'>
                                        <Grid.Column width={2}>
                                            <div></div>
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            <BlogElementChooser id={index + 1} onAdded={handleContentAdded} ></BlogElementChooser>
                                        </Grid.Column>
                                        <Grid.Column width={2}>   <div></div>
                                        </Grid.Column>
                                    </Grid>
                                </Container>
                            </div>
                        )}
                    </Segment>
                    
                    <Grid.Row width={4}><Button onClick={handleDocumentSave}>Veröffentlichen</Button></Grid.Row>
                </Container>
            </div>
    );
}


export default CreateBlog;