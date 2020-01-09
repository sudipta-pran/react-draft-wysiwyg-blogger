import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Post from './Post'
import '../App.css';

export default function PostList() {
    const [posts, setPosts] = useState({})
  
    useEffect(() => {
      fetch('http://localhost:5000/api/posts/')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setPosts(data.reverse())
        })
    }, [])
    return (
        <div className="post-list">
          
          <Link className="btn" to={"/addpost"}>Add Post</Link> <br/><br/>
            {
              posts.length > 0 
                ?  posts.map(post => <Post post={post} key={post._id}/>)
                : <h1>Loading...</h1>
            }
        </div>
    )
}
