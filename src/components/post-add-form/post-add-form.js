import React, { Component } from 'react';
import './post-add-form.css';

export default class PostAddForm extends Component {

  constructor(props) {
    super (props);
    this.state = {
      text: ''
    }
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange(e) {
    const target = e.target;
    this.setState({ text: target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.text.length !== 0) {
      this.props.onAdd(this.state.text);
      this.setState({ text: '' });
    } else {
      return;
    }
  }

  render () {
    return ( 
      <form 
      className="bottom-panel d-flex"
      onSubmit={this.onSubmit}
      >
        <input 
          className="form-control new-post-label" 
          type="text" 
          placeholder="О чем расскажем?"
          onChange={this.onValueChange}
          value={this.state.text}
        />
        <button 
          type="submit"
          className="btn btn-outline-secondary">
          Добавить
        </button>
      </form>
    )
  }
}