import React, { useState } from "react";
import BlogCard from './../BlogCard/BlogCard';
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


  const [amountBlogs, setAmountBlogs] = useState(props.amount);
  const [blogs, setBlogs] = useState([
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "zxy", text: "zzz", summary: "helloooO from blog 2" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },
    { id: "abc", text: "abb", summary: "helloooO" },]);

  function handleSetAmountBlogs(amount) {
    setAmountBlogs(amount);
  }

  return (
    <div className="blog-card-holder">
  <div class="ui grid">
          {blogs.slice(0, 10).map(blog =>
           <div class="three wide column"> <BlogCard blog={blog} url={`${props.match.url}/${blog.id}`} /></div>
          )} 
           </div>
    </div>
  );
}


export default BlogCardHolder;