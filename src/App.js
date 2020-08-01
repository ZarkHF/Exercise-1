import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import { todos } from './todos.json';
import ToDoForm from './components/ToDoForm';
import { Add } from './store/actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos,
      viewForm: false,
      toEdit: {
        title: '',
        description: '',
      }
    }
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    /* this.viewForm = this.viewForm.bind(this) */
  }
  

  viewForm() {
    this.setState({
      viewForm: true
    });
  }

  hideForm() {
    this.setState({
      viewForm: false
    });
  }

  handleAddTodo(todo) {
    this.setState({
      todos: [...this.state.todos, todo]
    })
    this.hideForm();
  }

  handleEditTodo(index) {
    /* console.log('edit', index); */
    const today = new Date();
    const date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
    this.setState({
      todos: this.state.todos.filter((e, i) => {
        if (i === index) {
          e.title = this.state.toEdit.title;
          e.description = this.state.toEdit.description;
          e.date = date;
          e.toEdit = false;
        }
        return e
      })
    });
  }

  handleInputChange(e) {
    const today = new Date();
    const date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();

    const { value, name, index } = e.target;
    console.log(value, name, index);
    this.setState({
      toEdit: {
        [name]: value,
        date: date
      }
    });
  }

  removeTodo(index) {
    this.setState({
      todos: this.state.todos.filter((e, i) => {
        return i !== index
      })
    });
  }

  editTodo(index) {
    this.hideForm();
    /* console.log(index) */
    this.setState({
      todos: this.state.todos.filter((e, i) => {
        if (i !== index) {
          e.toEdit = false;
        } else {
          e.toEdit = true;
        }
        return e
      })
    });
    /* console.log(todos); */
  }

  render() {
    const todos = this.state.todos.map((todo, i) => {
      let taskCard;
      if (todo.toEdit) {
        let title = todo.title;
        let description = todo.description;
        taskCard =
          <div className="card mt-4">
            <div className="card-footer">
              <div className="card">
                <form className="card-body">
                  <div className="form-group">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={this.state.toEdit.title}
                      onChange={this.handleInputChange}
                      placeholder={title}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      value={this.state.toEdit.description}
                      onChange={this.handleInputChange}
                      placeholder={description}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={() => this.handleEditTodo(i)}>
                    Confirm
                  </button>
                </form>
              </div>
            </div>
          </div>
      } else {
        taskCard =
          <div className="card mt-4">
            <div className="card-title text-center">
              <h3>{todo.title}</h3>
              <span className="badge badge-danger ml-2">
                {todo.date}
              </span>
            </div>
            <div className="card-body">
              {todo.description}
            </div>
            <div className="card-footer">
              <button
                className="btn btn-success mr-5"
                onClick={this.editTodo.bind(this, i)}>
                Edit
          </button>
              <button
                className="btn btn-danger"
                onClick={this.removeTodo.bind(this, i)}>
                Delete
            </button>
            </div>
          </div>
      }

      return (
        <div className="col-md-4" key={i}>
          {taskCard}
        </div>
      )
    });

    const viewForm = this.state.viewForm;
    let form;
    let formButton;
    if (viewForm) {
      form = <ToDoForm onAddTodo={this.handleAddTodo}></ToDoForm>
      /* form = <ToDoForm onAddTodo={(todo) => dispatch(Add(todo))}></ToDoForm> */
      formButton = null
    } else {
      form = null
      formButton = <button className="btn btn-primary" onClick={this.viewForm.bind(this)}>Add+ </button>
      
    }

    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            To do list
            <span className="badge badge-pill badge-light ml-2">
              {this.state.todos.length}
            </span>
          </a>
          {formButton}
        </nav>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              <img src={logo} className="App-logo" alt="logo" />
              {form}
            </div>
            <div className="col-md-8">
              <div className="row">
                {todos}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
