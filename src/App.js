import React, { Component } from 'react';
import TodoList from './components/todoList';
import Input from './components/input';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div id="inputWrapper">
          <Input />
        </div>
        <div id="todoWrapper">
          <TodoList />
        </div>
      </div>
    );
  }
}
export default App;