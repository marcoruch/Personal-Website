import React, { useState } from "react";
import './OverviewBlog.scss'
import { Dimmer, Loader } from 'semantic-ui-react'

import BlogPost from './../BlogPost/BlogPost';
import firebase from './../Firebase/Firebase';



function OverviewBlog() {

    // user
    const [blogs, setBlogs] = useState(null);

    firebase.auth().onAuthStateChanged((user) => {
            firebase.firestore().collection(user.uid).get().then(function (snapshot) {
                let newBlogs = snapshot.docs.map(doc => doc.data());
                setBlogs(newBlogs);
            });
    });



    return (
        blogs === null ? 
        <React.Fragment>
            <Dimmer active>
                <Loader />
            </Dimmer>
        </React.Fragment>
        : <div>{blogs.map(blog => <BlogPost blog={blog}></BlogPost>)}</div>
    );
}

export default OverviewBlog;