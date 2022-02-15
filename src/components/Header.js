import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    console.log(this.props);
    return (
      <header>
        <h2 data-testid="header-player-name">{ name }</h2>
        <img
          data-testid="header-profile-picture"
          alt="profile_image"
          src={ gravatarEmail }
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
  console.log(state.token);
  const { player: { name, gravatarEmail, assertions, score } } = state;
  return {
    name, gravatarEmail, assertions, score,
  };
};

export default connect(mapStateToProps)(Header);
