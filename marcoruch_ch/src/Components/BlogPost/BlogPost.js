import React, { useState } from "react";
import BlogTag from "./../BlogTag/BlogTag";
import { GetElementByElement } from "./../BlogElementFactory/BlogElementFactory";


const flex = {
    display: 'flex',
    flexDirection: 'row'
}

function BlogPost({blog}) {
    const [blogTitle] = useState(blog.title);
    const [blogTags] = useState(blog.tags);
    const [blogContent] = useState(blog.content);
    return (
        <React.Fragment>
            <div className="blog-entry">
            <h1>{blogTitle}</h1>
            <div style={flex}>{blogTags.map(tag => <BlogTag tag={tag}></BlogTag>)}</div></div>
            <hr></hr>
            {blogContent.map((content,index) => GetElementByElement(content, index))}
        </React.Fragment>
    );
}


export default BlogPost;