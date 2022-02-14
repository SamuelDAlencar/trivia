import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import token from '../redux/actions';
import requestToken from '../service/tokenApi';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleButton = (callback) => {
    requestToken().then((data) => {
      callback(data.token);
      localStorage.setItem('token', data.token);
    });
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
            onClick={ () => this.handleButton(handleClick) }
          >
            Play
          </button>
        </form>
      </main>
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
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
