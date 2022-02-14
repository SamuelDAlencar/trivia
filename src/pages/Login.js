import React, { Component } from 'react';
import requestToken from '../service/tokenApi';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      token: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleButton = () => {
    requestToken().then((data) => this.setState({
      token: data.token,
    }));
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
            onClick={ this.handleButton }
          >
            Play
          </button>
        </form>
      </main>
    );
  }
}
