import React, { useState, useEffect } from "react";
import BlogTag from "./../BlogTag/BlogTag";
import { Loader, Divider } from 'semantic-ui-react';
import { GetElementByElement } from "./../BlogElementFactory/BlogElementFactory";
import firebase from '../Firebase/Firebase';
import './BlogPost.scss';
import Me from './../../Content/img/marcoruch_cv.jpg'


function BlogPost({ routingParams }) {

    const [blogId, setBlogId] = useState(routingParams['blogId']);
    const [blog, setBlog] = useState(null);
    const [blogOverviewData, setBlogOverviewData] = useState(null);

    async function fetchBlog() {
        await firebase.firestore().collection('blogs').doc(blogId).get().then((docRef) => {
            setBlog(docRef.data());
            console.log(docRef.data());
        });

        await firebase.firestore().collection('blogOverviewData').where("blogId", "==", blogId).get().then((snapshot) => {
            setBlogOverviewData(snapshot.docs[0].data());
        });
    }

    useEffect(() => {
        fetchBlog();
    }, []);



    return (
        !blog || !blogOverviewData ? <Loader> </Loader>
            : <React.Fragment>
                <div className="blog-header">
                    <div className="blog-title">
                        <h1>{blogOverviewData.blogTitle} -  {blogOverviewData.editedDate.toDate().toLocaleDateString()}</h1>
                    </div>
                    <div className="blog-me">
                        <div className="picture-holder">
                            <img alt="CVpicture" src={Me}></img>
                        </div>
                        <div className="meta">
                            <h1>Marco Ruch</h1>
                            <h2>Junior Software Engineer</h2>
                            <h3>Aarau, Schweiz</h3></div>
                    </div>
                </div>


                <div className="blog-content-holder">
                    <div className="blog-content"
                        dangerouslySetInnerHTML={{
                            __html: blog.content
                        }} />

                    <div className="blog-divider"></div>
                    <div className="blog-tags">
                        {blogOverviewData.blogTags.map(tag => <BlogTag key={tag} tag={tag}></BlogTag>)}
                    </div>
                </div>
            </React.Fragment>
    );
}


export default BlogPost;