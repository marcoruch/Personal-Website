import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from 'semantic-ui-react';
import firebase from './../Firebase/Firebase';
import "./BlogCard.scss";

function BlogCard({ uid }) {


    const [blog, setBlog] = useState(null);

    async function fetchBlog() {
        let fetchedBlog = [];
        const snap = await firebase.firestore().collection(uid).get()
        snap.docs.map(doc => fetchedBlog.push(doc.data()));
        setBlog(fetchedBlog);
    }

    useEffect(() => {
        fetchBlog();
    }, []);


    return !blog
        ? <div className="blogLoader"><Loader active inline='centered' /></div>
        : (<div className="blogcard">
                <div className="header">
                    <h1>Anzahl Blogeinträge: {blog.length}</h1>
                </div>
                <div className="content">
                    <div className="summary">
                       {blog.map(blogItem =>  <div className="blog-small"> {blogItem.title}</div>)}
                    </div>

                    
                </div>
                
                <Link className="ui button user-profile" to={uid}>{uid}</Link>
            </div>
        );
}


export default BlogCard;