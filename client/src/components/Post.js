import React from 'react'
import '../App.css';

export default function Post(props) {
    return (
        <div className="single-post">
            <h1>{props.post.title}</h1>
        </div>
    )
}
