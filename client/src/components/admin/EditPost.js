import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {stateToHTML} from 'draft-js-export-html'


export default function EditPost(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState(EditorState.createEmpty())
    const history = useHistory()

    useEffect(() => {
        console.log("PARAM: ", props.match.params.id)
        fetch(`http://localhost:5000/api/posts/${props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                const contentState = convertFromRaw(data.description)
                const editorState = EditorState.createWithContent(contentState)
                setDescription(editorState)
            })
            .catch(err => console.log("An error occured:", err))
    }, [props.match.params.id])

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
        console.log("EDITED POST: ",newPost)
        fetch(`http://localhost:5000/api/posts/${props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTitle('')
            setDescription(EditorState.createEmpty())
            history.goBack()
        })
        .catch(err => console.log("ERROR:",err))
    }

    return (
        <div>
            <h1>Edit Post</h1>
            <br/><br/>
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
                        toolbar={{ image: { uploadEnabled: true, uploadCallback: uploadCB, previewImage: true }}}
                        onEditorStateChange={editorState => setDescription(editorState)}
                    />
                </div>
                <br/>
                <div dangerouslySetInnerHTML={convertDescriptionFromJSONToHTML()}></div>
                <br/>
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                          SUBMIT
                </button>
            </form>
        </div>
    )
}
