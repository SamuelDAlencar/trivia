import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../pages/style/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      emailHash: '',
    };
  }

  componentDidMount() {
    this.convertEmail();
  }

  convertEmail = () => {
    const { gravatarEmail } = this.props;
    this.setState({ emailHash: md5(gravatarEmail).toString() });
  }

  render() {
    const { name, score } = this.props;
    const { emailHash } = this.state;

    return (
      <header className="header">
        <section className="name-logo">
          <img
            data-testid="header-profile-picture"
            alt="profile_image"
            src={ `https://www.gravatar.com/avatar/${emailHash}` }
          />
          <h1 className="name">
            Player:
            {' '}
            <span data-testid="header-player-name">{ name }</span>
          </h1>
        </section>
        <h2 className="score">
          Score:
          {' '}
          <span data-testid="header-score">{ score }</span>
        </h2>
      </header>
    );
  }
}

Header.propTypes = {
  name: propTypes.string,
  gravatarEmail: propTypes.string,
  assertions: propTypes.number,
  score: propTypes.number,
}.isRequired;

const mapStateToProps = (state) => {
  const { player: { name, gravatarEmail, assertions, score } } = state;
  return {
    name, gravatarEmail, assertions, score,
  };
};

export default connect(mapStateToProps)(Header);
