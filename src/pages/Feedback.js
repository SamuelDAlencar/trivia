import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerAction, scoreAction } from '../redux/actions';
import * as global from '../consts';
import './style/Feedback.css';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      scoreFeedback: '',
    };
  }

  componentDidMount() {
    this.resultsHandler();
  }

  resultsHandler = () => {
    const { assertions } = this.props;

    if (assertions < global.ASSERTIONS) {
      this.setState({ scoreFeedback: 'Could be better...' });
    } else if (assertions >= global.ASSERTIONS) {
      this.setState({ scoreFeedback: 'Well Done!' });
    }
  }

  playAgain = () => {
    const { history, resetGame } = this.props;
    resetGame(0, 0, {});
    history.push('/');
  }

  toRankingPage = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { scoreFeedback } = this.state;
    const { score, assertions } = this.props;
    return (
      <div className="feedback">
        <Header />
        <section className="container">
          <h1>
            Score:
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
          </h1>
          <h1>
            Assertions:
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </h1>
          <h1 data-testid="feedback-text">
            { scoreFeedback }
          </h1>
          <button
            className="btn"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.toRankingPage }
          >
            Ranking
          </button>
          <button
            className="btn"
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Play again!
          </button>
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: propTypes.number,
  assertions: propTypes.number,
  resetGame: propTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
