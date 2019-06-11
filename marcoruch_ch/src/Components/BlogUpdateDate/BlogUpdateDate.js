import React from "react";



function BlogUpdateDate(props) {
    return (
        <div className="h1" style={{
            height: '90%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
           <h1>Updated: {props.date.toLocaleDateString('de-DE')}</h1>
        </div>
    );
}

export default BlogUpdateDate;