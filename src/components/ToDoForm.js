import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Add } from '../store/actions';


class ToDoForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      Date: '',
      toEdit: false
    };
    
    /* const todos = useSelector(state => state.todos); */
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddTodo(this.state);
    this.setState({
      title: '',
      description: '',
      date: ''
    });
  }

  handleInputChange(e) {
    const today = new Date();
    const date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();

    const { value, name } = e.target;
    console.log(value, name);
    this.setState({
      [name]: value,
      date: date
    });
  }

  render() {
    /* const dispatch = useDispatch(); */
    return (
      <div className="card">
        <form /* onSubmit={this.handleSubmit} */ className="card-body">
          <div className="form-group">
            <input
              type="text"
              name="title"
              className="form-control"
              value={this.state.title}
              onChange={this.handleInputChange}
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="description"
              className="form-control"
              value={this.state.description}
              onChange={this.handleInputChange}
              placeholder="Description"
            />
          </div>
          <button type="submit" className="btn btn-primary" /* onClick={() => dispatch(Add(this.state))} */>
            Save
          </button>
        </form>
      </div>
    )
  }
}

export default ToDoForm;