import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerAction, scoreAction } from '../redux/actions';
import './style/Ranking.css';

class Ranking extends Component {
  goHome = () => {
    const { history, resetGame } = this.props;
    resetGame(0, 0, {});
    history.push('/');
  }

  render() {
    return (
      <div className="ranking">
        <section className="container">
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            className="btn"
            type="button"
            data-testid="btn-go-home"
            onClick={ this.goHome }
          >
            Home
          </button>
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  score: propTypes.number,
  assertions: propTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame(resetS, resetA, resetP) {
    dispatch(scoreAction(resetS, resetA));
    dispatch(playerAction(resetP));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
