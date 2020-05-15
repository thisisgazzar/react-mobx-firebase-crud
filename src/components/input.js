import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('Store')
@observer

class Input extends Component {

  handleInputForm = (e) => {
    e.preventDefault()

    if (this.props.Store.inputItem !== null && this.props.Store.inputItem.trim() !== '') {
      let post = this.props.Store.inputItem;
      this.props.Store.addPost(post)
      this.props.Store.inputItem = ''
      e.target[0].value = ''
    }
  }

  handleChange = (e) => {
   this.props.Store.inputItem = e.target.value
  }

  render() {
    return (
      <div className="ListInput container">
        <div className="col-md-8 d-block mx-auto">
          <form onSubmit={this.handleInputForm}>
            <input id='inputItem' placeholder="What's on your mind?" onChange={this.handleChange} />
          </form>
        </div>
      </div>
    );
  }
}

export default Input;