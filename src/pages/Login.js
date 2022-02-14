import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target }) {
    const { id, value } = target;

    this.setState({
      [id]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <form className="form">
        <label htmlFor="name" className="main__form__label">
          Name:
          <input
            id="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleInput }
            className="form__label__input"
          />
        </label>
        <label htmlFor="email" className="form__label">
          Email:
          <input
            id="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleInput }
            className="form__label__input"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !name || !email }
          className="form__button"
        >
          Play!
        </button>
      </form>
    );
  }
}
