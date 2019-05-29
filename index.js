// Importing Modules
import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';

// import uuid from 'uuid';  // Not Used Anymore

// Importing React-Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Importing Components
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';


import './style.css';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }));
  }

 
  markComplete = (id) => {
      this.setState({
        todos: this.state.todos.map(todo => {
          if(todo.id === id)
            todo.completed = !todo.completed;
          return todo;
        })
      });
  }

  
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
  }

  addTodo = (title) => {
  
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    })
      .then(res => this.setState({
        todos: [...this.state.todos, res.data]
      }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
        
            <br />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete = {this.markComplete} delTodo={this.delTodo}/>
              </React.Fragment>
            )} />

           
          </div>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));