import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from 'semantic-ui-react';
import firebase from './../Firebase/Firebase';
import "./BlogCard.scss";

function BlogCard(props) {


    const [blogs, setBlogs] = useState(null);

    async function fetchBlogs() {
        let fetchedBlogs = [];
        
        await firebase.firestore().collection('blogUsers').doc('userUids').get().then(function (doc) {
           console.log(doc.data());
            if (doc.exists) {
                doc.data().uids.forEach(uid => {
                    fetchedBlogs.push(uid);
                });
            }

        });
        setBlogs(fetchedBlogs);
    }

    useEffect(() => {
        fetchBlogs();
    }, []);



    return !blogs
        ? <div className="skillsloader"><Loader active inline='centered' /></div>
        : (blogs.map((uid) =>
            <div className="blogcard">
                <div className="content">
                    <div className="header">{uid}</div>
                </div>
                <div className="content">
                    <div className="summary">
                        <p>{uid}</p>
                    </div>
                </div>
                <div className="extra content">
                    <Link className="ui button" to={props.url}>{uid}</Link>
                </div>
            </div>
        )
        );
}


export default BlogCard;