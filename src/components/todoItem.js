import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('Store')
@observer

class TodoItem extends Component {
  constructor() {
    super();
    this.state={
      editing: false
    }
  }

  handleDelete = () => {
    let id = this.props.id;
    this.props.Store.removePost(id);
  }

  handleEdit = () => {
    this.setState({
      editing: true
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let id = this.props.id;
    let editedPost = this.newInput.value;
    this.props.Store.editPost(id, editedPost);
    this.setState({
      editing: false
    })
  }

  render() {
    if (!this.state.editing) {
      return (
        <div className="todoComponent col-md-12">
          <div className="postItem">
            <div className="cardLeft">
              <p>{this.props.listItem}</p>
            </div>
            <div className="cardRight">
              <button className="editBtn" onClick={this.handleEdit}>edit</button>            
              <button className="deleteBtn" onClick={this.handleDelete}>delete</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div class="todoComponent col-md-12">
          <form onSubmit={this.handleSubmit}>
            <input
              class="editInput"
              ref={input => {
                this.newInput = input
              }}
              defaultValue={this.props.listItem}
            />
          </form>
        </div> 
      )
    }
  }
}

export default TodoItem;