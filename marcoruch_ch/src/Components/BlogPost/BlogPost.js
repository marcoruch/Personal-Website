import React, { useState } from "react";
import BlogTag from "./../BlogTag/BlogTag";
import { GetElementByElement } from "./../BlogElementFactory/BlogElementFactory";


const flex = {
    display: 'flex',
    flexDirection: 'row'
}

function BlogPost({blog}) {
    const [blogTitle, setBlogTitle] = useState(blog.title);
    const [blogTags, setBlogTags] = useState(blog.tags);
    const [blogContent, setBlogContent] = useState(blog.content);
    const [blogCreateDate, setBlogCreateDate] = useState(blog.createDate);
    const [blogUpdateDate, setBlogUpdateDate] = useState(blog.updateDate);
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