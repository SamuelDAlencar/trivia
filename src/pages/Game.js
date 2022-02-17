import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaApi from '../services/triviaApi';
import { tokenAction, scoreAction } from '../redux/actions';
import requestToken from '../services/tokenApi';
import * as global from '../consts';
import './style/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = { apiReturn: [],
      currAnswers: [],
      currQues: 0,
      time: 30,
      isDisabled: false,
      score: 0,
      assertions: 0,
      difScore: 0,
      answered: false };
  }

  componentDidMount() {
    this.getQuestions();
    this.handleTimer();
  }

  getQuestions = async () => {
    const { token, renewToken } = this.props;
    const { currQues } = this.state;
    const apiReturn = await triviaApi(token);

    if (apiReturn.response_code === global.ERROR_RESPONSE) {
      const newToken = await requestToken();
      const newApiReturn = await triviaApi(newToken.token);
      const { results } = newApiReturn;
      const incorrectAnswers = results[currQues].incorrect_answers;
      const correctAnswer = results[currQues].correct_answer;

      if (results[currQues].difficulty === 'easy') {
        this.setState({ difScore: global.EASY_SCORE });
      } else if (results[currQues].difficulty === 'medium') {
        this.setState({ difScore: global.MEDIUM_SCORE });
      } else if (results[currQues].difficulty === 'hard') {
        this.setState({ difScore: global.HARD_SCORE });
      }
      this.setState({
        apiReturn: newApiReturn.results,
        currAnswers: [...incorrectAnswers, correctAnswer]
          .sort(() => Math.random() - global.RANDOM_ASSIST),
      });
      renewToken(newToken);
    } else {
      const { results } = apiReturn;
      const incorrectAnswers = results[currQues].incorrect_answers;
      const correctAnswer = results[currQues].correct_answer;

      if (results[currQues].difficulty === 'easy') {
        this.setState({ difScore: global.EASY_SCORE });
      } else if (results[currQues].difficulty === 'medium') {
        this.setState({ difScore: global.MEDIUM_SCORE });
      } else if (results[currQues].difficulty === 'hard') {
        this.setState({ difScore: global.HARD_SCORE });
      }
      this.setState({
        apiReturn: apiReturn.results,
        currAnswers: [...incorrectAnswers, correctAnswer]
          .sort(() => Math.random() - global.RANDOM_ASSIST),
      });
    }
  }

  handleTimer = () => {
    clearInterval(this.handleCounter);
    this.handleCounter = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
      const { time } = this.state;
      if (time === 0) {
        clearInterval(this.handleCounter);
        this.setState({ isDisabled: true, time: 30, answered: true }, () => {
          const allButtons = [...document
            .getElementsByClassName(global.CLASS_BTN)];
          allButtons.forEach((button) => button.classList.add('wrong'));
        });
      }
    }, global.MIL);
  };

  answerButton = ({ target }) => {
    const { updateScore } = this.props;
    const { time } = this.state;
    const allButtons = [...document.getElementsByClassName(global.CLASS_BTN)];
    this.setState({ isDisabled: true });
    if (target.dataset.testid === global.CORRECT_ANSWER) {
      const { difScore } = this.state;
      this.setState((prevState) => ({
        score: prevState.score + (global.BASE_SCORE + (time * difScore)),
        assertions: prevState.assertions + 1,
      }), () => {
        const { score, assertions } = this.state;
        updateScore(score, assertions);
        localStorage.setItem('score', score);
      });
    }
    allButtons.forEach((button) => {
      if (button.dataset.testid === global.CORRECT_ANSWER) {
        button.classList.add('correct');
      } else { button.classList.add('wrong'); }
    });
    this.setState({ answered: true });
    clearInterval(this.handleCounter);
  }

  redToFeedback = () => {
    const { history } = this.props;
    localStorage.setItem('score', 0);
    history.push('/feedback');
  }

  nextQuestion = () => {
    this.setState((prevState) => ({
      answered: false,
      currQues: prevState.currQues + 1,
      isDisabled: false,
    }), () => {
      const { currQues } = this.state;
      const { apiReturn } = this.state;
      const incorrectAnswers = apiReturn[currQues].incorrect_answers;
      const correctAnswer = apiReturn[currQues].correct_answer;
      this.setState({
        currAnswers: [...incorrectAnswers, correctAnswer]
          .sort(() => Math.random() - global.RANDOM_ASSIST),
      });
    });
    const allButtons = [...document
      .getElementsByClassName('game-main__answer-section__answer')];

    allButtons.forEach((button) => {
      if (button.dataset.testid === 'correct-answer') {
        button.classList.remove('correct');
      } else if (button.dataset.testid.indexOf('wrong') > global.INDEXOF_ASSIST) {
        button.classList.remove('wrong');
      }
    });
    this.setState({ time: 30 }, () => this.handleTimer());
  }

  render() {
    const { apiReturn, currQues, currAnswers, isDisabled, time, answered } = this.state;
    const isFetching = !apiReturn.length > 0;

    return (
      <div className="game">
        <Header />
        {
          isFetching
            ? <h1 className="game-loading">{global.LOADING}</h1>
            : (
              <main className="game-main">
                <h4
                  data-testid="question-category"
                  className="game-main__category"
                >
                  {apiReturn[currQues].category}
                </h4>
                <h3
                  data-testid="question-text"
                  className="game-main__question"
                >
                  {apiReturn[currQues].question}
                </h3>
                <section
                  data-testid="answer-options"
                  className="game-main__answers-section"
                >
                  {currAnswers
                    .map((answer, i) => (
                      <button
                        type="button"
                        key={ i }
                        data-testid={
                          answer.match(apiReturn[currQues].correct_answer)
                            ? 'correct-answer'
                            : `wrong-answer-${i}`
                        }
                        className="game-main__answer-section__answer"
                        disabled={ isDisabled }
                        onClick={ this.answerButton }
                      >
                        {answer}
                      </button>
                    ))}
                </section>
                { answered
                && (currQues < global.QUESTIONS_LENGTH - 1
                  ? (
                    <button
                      type="button"
                      data-testid="btn-next"
                      className="game-main__next-button"
                      onClick={ this.nextQuestion }
                    >
                      Próxima questão
                    </button>)
                  : (
                    <button
                      type="button"
                      data-testid="btn-next"
                      className="game-main__next-button"
                      onClick={ this.redToFeedback }
                    >
                      Feedback final
                    </button>))}
              </main>
            )
        }
        <footer className="footerTime">
          <h4>{ `Timer:  ${time}`}</h4>
        </footer>
      </div>
    );
  }
}

Game.propTypes = {
  renewToken: propTypes.func,
  token: propTypes.object,
}.isRequired;

const mapStateToProps = (state) => {
  const { token, player: { score } } = state;
  return { token, score };
};

const mapDispatchToProps = (dispatch) => ({
  renewToken(token) { dispatch(tokenAction(token)); },
  updateScore(score, assertions) { dispatch(scoreAction(score, assertions)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
