import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { score } = this.props;
    return (
      <h1 data-testid="feedback-text">{ score }</h1>
    );
  }
}

Feedback.propTypes = {
  score: propTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
