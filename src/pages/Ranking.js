import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { playerAction, scoreAction } from '../redux/actions';
import './style/Ranking.css';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleRanking = async () => {
    const { name, score, picture } = this.props;

    if (name) {
      if (localStorage.getItem('ranking')) {
        localStorage.setItem('ranking', JSON.stringify(
          [
            ...JSON.parse(localStorage.getItem('ranking')),
            {
              name, score, picture,
            },
          ],
        ));
      } else {
        localStorage.setItem('ranking', JSON.stringify(
          [
            {
              name, score, picture,
            },
          ],
        ));
      }
    }
    this.setState({ ranking: JSON.parse(localStorage.getItem('ranking')) });
  }

  goHome = () => {
    const { history, resetGame } = this.props;
    resetGame(0, 0, {});
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking">
        <section className="container">
          <h1 data-testid="ranking-title">Ranking</h1>
          <ul className="ranking-players">
            {ranking.sort((a, b) => b.score - a.score).map((player, i) => (
              <li key={ i }>
                <h4>
                  Name:
                  {' '}
                  <span data-testid={ `player-name-${i}` }>{player.name}</span>
                </h4>
                <h4>
                  Score:
                  {' '}
                  <span data-testid={ `player-score-${i}` }>{player.score}</span>
                </h4>
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-testid="btn-go-home"
            className="btn"
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
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
  picture: `${md5(state.player.assertions).toString()}`,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame(resetS, resetA, resetP) {
    dispatch(scoreAction(resetS, resetA));
    dispatch(playerAction(resetP));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
