import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tokenAction, playerAction } from '../redux/actions';
import requestToken from '../services/tokenApi';
import logo from '../trivia.png';
import './style/Login.css';

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
    const { name, gravatarEmail } = this.state;
    const { handleClick } = this.props;
    return (
      <div className="login">
        <form className="form" autocomplete="off">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="name" className="form__label">
            <input
              id="name"
              data-testid="input-player-name"
              placeholder="Name"
              value={ name }
              onChange={ this.handleInput }
              className="form__label__input"
            />
          </label>
          <label htmlFor="email" className="form__label">
            <input
              id="gravatarEmail"
              data-testid="input-gravatar-email"
              placeholder="Email"
              value={ gravatarEmail }
              onChange={ this.handleInput }
              className="form__label__input"
            />
          </label>
          <section className="buttons">
            <button
              type="button"
              data-testid="btn-play"
              disabled={
                !name
                || !gravatarEmail
                || !gravatarEmail.includes('@')
                || !gravatarEmail.includes('.com')
              }
              onClick={ () => this.handleButton(handleClick) }
              className="form__button"
            >
              Play!
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => this.roteSettings() }
              className="form__button settings"
            >
              Settings
            </button>
          </section>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClick(state) {
    dispatch(playerAction(state));
    dispatch(tokenAction(state.token));
  },
});

Login.propTypes = {
  handleClick: PropTypes.func,
  push: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
