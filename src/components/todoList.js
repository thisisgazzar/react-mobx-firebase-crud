import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import TodoItem from './todoItem';

@inject('Store')
@observer

class TodoList extends Component {
  constructor() {
    super();
    this.state={
      loading: false
    }
  }

  componentWillMount(){
    this.setState({loading: true})
    const previousPosts = this.props.Store.posts;

    this.props.Store.database.on('child_added', snap => {
      previousPosts.push({
        id: snap.key,
        postContent: snap.val().postContent
      })
      this.props.Store.posts = previousPosts
      this.setState({loading: false})
    })

    this.props.Store.database.on('child_removed', snap => {
      for(var i=0; i < previousPosts.length; i++){
        if(previousPosts[i].id === snap.key){
          previousPosts.splice(i, 1);
        }
      }
      this.props.Store.posts = previousPosts
    })


    this.props.Store.database.on('child_changed', snap => {
      for(var i=0; i < previousPosts.length; i++){
        if(previousPosts[i].id === snap.key){
          previousPosts[i] = {
            id: snap.key,
            postContent: snap.val().postContent
          }
        }
      }
      this.props.Store.posts = previousPosts
    })

  }
  render() {
    return(
      <div className="todoListWrapper row">

        { this.state.loading ? 
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : 
          this.props.Store.posts.map((n, i) => (
            <TodoItem  listItem={n.postContent} key={i} id={n.id} />
          ))
        }
      </div>
    )
  }
}

export default TodoList;