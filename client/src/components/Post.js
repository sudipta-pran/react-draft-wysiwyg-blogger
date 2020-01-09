import React from 'react'
import { Link } from 'react-router-dom';
import {stateToHTML} from 'draft-js-export-html';
import {  convertFromRaw } from 'draft-js';
import '../App.css';

export default function Post(props) {
    const convertFromJSONToHTML = (text) => {
        try{
            return { __html: stateToHTML(convertFromRaw(text))}
          } catch(exp) {
            console.log(exp)
            return { __html: 'Error' }
          }
    }
    return (
        <div className="single-post">
            <h1>{props.post.title}</h1>
            
            <Link to={"/editpost/"+props.post._id}>Edit</Link> <br/><br/>
            <div dangerouslySetInnerHTML={convertFromJSONToHTML(props.post.description)} ></div>
        </div>
    )
}
