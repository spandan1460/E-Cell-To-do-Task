import React, { Component } from "react";
import Todo from "./components/Todo";
import Addtodo from "./components/Addtodo";
import Header from "./components/Header";
import axios from "axios";
// headers={
//   'Server': Cowboy
//   'Connection': keep-alive
//   'X-Powered-By': Express
//   'Vary': Origin
//   'Access-Control-Allow-Credentials': true
//   Access-Control-Expose-Headers: x-auth-token
//   X-Auth-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrQGdtYWlsLmNvbSIsInR5cGUiOiJVc2VyIiwiaWF0IjoxNjI4Nzk1MTI2LCJleHAiOjE2MzEzODcxMjZ9.O6IE7laXzy2fqCzDEuImReJpNGl2vZ_HpHGYEPO9DJo
//   Content-Type: application/json; charset=utf-8
//   Content-Length: 127
//   Etag: W/"7f-h4C+1jMxns5L6D3rL308NwoeorM"
//   Date: Thu, 12 Aug 2021 19:05:26 GMT
//   Via: 1.1 vegur}

import "./App.css";

// const api = 'https://stackhack-todo.herokuapp.com/api/todo';
// const token = JSON.parse(sessionStorage.getItem('data'));

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
      .then(res =>
        this.setState({
          todos: res.data
        })
      );
  }

  //toggle complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  // Delete Todo
  deleteTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  };

  // Add Todo
  Addtodo = title => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos?", {
        title,
        completed: false
      })
      .then(res =>
        this.setState({
          todos: [...this.state.todos, res.data]
        })
      );
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <Addtodo Addtodo={this.Addtodo} />{" "}
          <Todo
            todos={this.state.todos}
            markComplete={this.markComplete}
            deleteTodo={this.deleteTodo}
          />{" "}
        </div>{" "}
      </div>
    );
  }
}

export default App;
