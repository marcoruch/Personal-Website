import React from "react";



function BlogCreateDate(props) {
    return (
        <div className="h1" style={{
            height: '90%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1 >Created: {props.date.toLocaleDateString('de-DE')}</h1>
        </div>
    );
}

export default BlogCreateDate;