import React, { useState, useEffect } from "react";
import BlogCard from '../BlogCard/BlogCard';
import { Loader } from 'semantic-ui-react';
import firebase from '../Firebase/Firebase';
import './BlogCardHolder.scss';



function BlogCardHolder(props) {



    const [blogOverviews, setBlogOverviews] = useState(null);

    async function fetchBlogs() {
        let fetchedBlogOverviewData = [];

        await firebase.firestore().collection('blogOverviewData').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                fetchedBlogOverviewData.push(doc.data());
            });
        });

        setBlogOverviews(fetchedBlogOverviewData);
    }

    useEffect(() => {
        fetchBlogs();
    }, []);


    return !blogOverviews ?
        < div className="skillsloader" > < Loader active inline='centered' /> </div> :
        (<div className="blog-card-holder" >
            <div className="header"> Blogs </div>

            <div className="blogs-holder" > {
                blogOverviews.map((blogOverview) => <BlogCard key={blogOverview.blogId} props={blogOverview} />)}
            </div>
        </div>
        );
}


export default BlogCardHolder;