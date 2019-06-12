import React, { useState, useEffect } from "react";
import BlogCard from './../BlogCard/BlogCard';
import { Loader } from 'semantic-ui-react';
import firebase from './../Firebase/Firebase';
import './BlogCardHolder.scss';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';



function BlogCardHolder(props) {



  const [blogs, setBlogs] = useState(null);

  async function fetchBlogs() {
    let fetchedBlogs = [];

    await firebase.firestore().collection('blogUsers').doc('userUids').get().then(function (doc) {
  
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
    : (
      <div className="blog-card-holder">
        <div className="header">  Blogs </div>

        <div className="blogs-holder">
          {blogs.map((uid) => <BlogCard uid={uid} />)}
          </div>
      </div>
    );
}


export default BlogCardHolder;