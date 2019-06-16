import React from "react";
import './BlogTag.scss'



function BlogTag(props) {
    return (
        <div className="blog-tag">
           <div class="ui teal tag label">{props.tag}</div>
        </div>
    );
}

export default BlogTag;