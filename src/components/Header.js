import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../pages/Game.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      emailHash: '',
    };

    this.convertEmail = this.convertEmail.bind(this);
  }

  componentDidMount() {
    this.convertEmail();
  }

  convertEmail() {
    const { gravatarEmail } = this.props;
    this.setState({ emailHash: md5(gravatarEmail).toString() });
  }

  render() {
    const { name, score } = this.props;
    const { emailHash } = this.state;

    return (
      <header>
        <h4 data-testid="header-player-name">{ name }</h4>
        <img
          data-testid="header-profile-picture"
          alt="profile_image"
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
        />
        <h4 data-testid="header-score">{ score }</h4>
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
