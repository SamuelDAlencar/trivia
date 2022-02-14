import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  roteSettings = () => {
    const { history } = this.props;
    history.push('/settings');
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
      <>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.roteSettings() }
          className="form__button"
        >
          Settings
        </button>
        <form className="form">
          <label htmlFor="name" className="form__label">
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
      </>
    );
  }
}

Login.propTypes = {
  push: PropTypes.func,
}.isRequired;
