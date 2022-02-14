import React, { Component } from 'react';

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
      <main>
        <form>
          <label htmlFor="name">
            Name
            <input
              id="name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleInput }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !name || !email }
          >
            Play
          </button>
        </form>
      </main>
    );
  }
}
