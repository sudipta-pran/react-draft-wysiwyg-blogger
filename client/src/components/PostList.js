import React, {useState, useEffect} from 'react'
import Post from './Post'
import '../App.css';

export default function PostList() {
    const [posts, setPosts] = useState({})
  
    useEffect(() => {
      fetch('http://localhost:5000/api/posts/')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setPosts(data)
        })
    }, [])
    return (
        <div className="post-list">
            {
              posts.length > 0 
                ?  posts.map(post => <Post post={post} key={post._id}/>)
                : <h1>Loading...</h1>
            }
        </div>
    )
}
