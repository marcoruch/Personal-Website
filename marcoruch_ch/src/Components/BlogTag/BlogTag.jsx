import React from "react";
import './BlogTag.scss'



function BlogTag(props) {
    return (
        <div className="blog-tag">
           <div className="ui orange label">{props.tag}</div>
        </div>
    );
}

export default BlogTag;