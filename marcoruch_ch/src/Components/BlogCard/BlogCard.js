import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from '../Firebase/Firebase';
import "./BlogCard.scss";




function BlogCard({ props }) {

    return (<div className="blogcard">
            <div className="header">
                <h1>{props.blogTitle}</h1>
            </div>
            <div className="content">
                <div className="summary">
                    {props.blogSummary}
                </div>
            </div>
            <div className="actions">
            <Link className="btn" to={`/blogs/${props.blogId}`}>
                            <i aria-hidden="true" className="angle right icon"></i>
                            Mehr darüber...
                        </Link>
            </div>

        </div>
        );


}


export default BlogCard;