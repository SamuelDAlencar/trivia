import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import token from '../redux/actions';
import requestToken from '../service/tokenApi';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      token: '',
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleButton = async (callback) => {
    const data = await requestToken();
    this.setState({ token: data.token }, () => {
      callback(this.state);
    });
    localStorage.setItem('token', data.token);
    const { history } = this.props;
    history.push('/game');
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
    const { handleClick } = this.props;
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
            onClick={ () => this.handleButton(handleClick) }
            className="form__button"
          >
            Play!
          </button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClick(state) {
    dispatch(token(state));
  },
});

Login.propTypes = {
  handleClick: PropTypes.func,
  push: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
