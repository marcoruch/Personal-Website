import React from "react";
import BlogTag from '../BlogTag/BlogTag'
import './BlogTags.scss'
import {
    Grid,
    Input,
} from 'semantic-ui-react';



function BlogTags(props) {


    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleBlogTagAdd(e)
        }
    }

    function handleBlogTagAdd(e) {
        if (!props.tags.includes(e.target.value) && props.tags.length < 9 && e.target.value !== "" && e.target.value.length > 1) {
            let newBlogTags = [...props.tags];
            newBlogTags.push(e.target.value);
            props.handleTagChange(newBlogTags);
        }
    }

  

    return (
        <div className="blog-tags">
            <Grid columns='ten' divided>
                {props.tags.map(blogTag =>
                    <Grid.Column width={3}><BlogTag tag={blogTag}></BlogTag></Grid.Column>)}
                <Grid.Column>
                    <Input onKeyDown={handleKeyDown}  maxLength="16"   placeholder='Tag hinzufügen' />
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default BlogTags;