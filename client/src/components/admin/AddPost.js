import React, {useState} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {stateToHTML} from 'draft-js-export-html'

export default function AddPost() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState(EditorState.createEmpty())

    const convertDescriptionFromJSONToHTML = () => {
        try{
          return { __html: stateToHTML(description.getCurrentContent())}
        } catch(exp) {
          console.log(exp)
          return { __html: 'Error' }
        }
      }

    const uploadCB = (file) => {    
        const formData = new FormData();
        formData.append('file', file);        
        
        return new Promise((resolve, reject) => {
          fetch('http://localhost:5000/uploadImage', {
            method: 'POST',
            body: formData
          })
          .then(res => res.json())
          .then( resData => {
            console.log(resData)    
            resolve({ data: { link: resData } });
          })
          .catch(error => {
              console.log(error)
              reject(error.toString())
          })
    
        })   
    
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        const newPost = {
          title: title,
          description: convertToRaw(description.getCurrentContent())
        }
        console.log("POST: ",newPost)
        fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log("ERROR:",err))
    }

    return (
        <div>
            <h1>Add</h1>
            <form noValidate onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text"
                        className="form-control"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                <br/>
                <div>
                    <Editor                          
                        editorState={description}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        wrapperStyle={{ border: "2px solid green", marginBottom: "20px" }}
                        editorStyle={{ height: "300px", padding: "10px"}}
                        onEditorStateChange={editorState => setDescription(editorState)}
                        toolbar={{ image: { uploadCallback: uploadCB }}}
                    />
                </div>
                <br/>
                <div dangerouslySetInnerHTML={convertDescriptionFromJSONToHTML()}></div>
                <br/>
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                          Add Post
                </button>
            </form>
        </div>
    )
}
