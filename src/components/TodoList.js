import React, { Component } from 'react';
import Item from './Item';

class TodoList extends Component {

  constructor(props) {
    super(props);
    const cachedTodos = localStorage.getItem('state');
    if (cachedTodos) {
     this.state = JSON.parse(cachedTodos);
   }
   else {
     this.state = {text: '', todos: []};
   }
  }

  update(e) {
    this.setState({text: e.target.value});
  }

  ajout(e) {
    this.setState({todos: [...this.state.todos, this.state.text],text: ''});
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.setState({todos: [...this.state.todos, this.state.text],text: ''});
        localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  render() {

    const todos = this.state.todos.map((todo, index) => <Item key={index} text={todo} />);

    return (
      <div className="TodoList">
      <input type="text" onChange={this.update.bind(this)} value={this.state.text} onKeyPress={this.handleKeyPress.bind(this)}/>
      <button onClick={this.ajout.bind(this)}>Ajouter</button>
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
}

export default TodoList;
