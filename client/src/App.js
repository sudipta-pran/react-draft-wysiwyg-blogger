import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PostList from './components/PostList'
import AddPost from './components/admin/AddPost'
import EditPost from './components/admin/EditPost'
import './App.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={PostList} />
        <Route exact path='/addpost' component={AddPost}/>
        <Route exact path='/editpost' component={EditPost}/>
      </Switch>
    </Router>
  );
}

export default App;
