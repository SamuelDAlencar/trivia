import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaApi from '../services/triviaApi';
import { token as tokenAction, score as scoreAction } from '../redux/actions';
import requestToken from '../services/tokenApi';
import './Game.css';

const ERROR_RESPONSE = 3;
const QUESTIONS_LENGTH = 5;
const RANDOM_ASSIST = 0.5;
const INDEXOF_ASSIST = -1;
const MIL = 1000;
const LOADING = 'Loading...';
const CORRECT_ANSWER = 'correct-answer';
const BASE_SCORE = 10;
const EASY_SCORE = 1;
const MEDIUM_SCORE = 2;
const HARD_SCORE = 3;
const ClassBtn = 'game-main__answer-section__answer';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      apiReturn: [],
      currAnswers: [],
      currQues: 0,
      time: 30,
      isDisabled: false,
      score: 0,
      difScore: 0,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.answerButton = this.answerButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.handleTimer();
  }

  async getQuestions() {
    const { token, renewToken } = this.props;
    const { currQues } = this.state;
    const apiReturn = await triviaApi(token);

    if (apiReturn.response_code === ERROR_RESPONSE) {
      const newToken = await requestToken();
      const newApiReturn = await triviaApi(newToken.token);
      const { results } = newApiReturn;
      const incorrectAnswers = results[currQues].incorrect_answers;
      const correctAnswer = results[currQues].correct_answer;

      if (results[currQues].difficulty === 'easy') {
        this.setState({ difScore: EASY_SCORE });
      } else if (results[currQues].difficulty === 'medium') {
        this.setState({ difScore: MEDIUM_SCORE });
      } else if (results[currQues].difficulty === 'hard') {
        this.setState({ difScore: HARD_SCORE });
      }

      this.setState({
        apiReturn: newApiReturn.results,
        currAnswers: [...incorrectAnswers, correctAnswer]
          .sort(() => Math.random() - RANDOM_ASSIST),
      });

      renewToken(newToken);
    } else {
      const { results } = apiReturn;
      const incorrectAnswers = results[currQues].incorrect_answers;
      const correctAnswer = results[currQues].correct_answer;

      if (results[currQues].difficulty === 'easy') {
        this.setState({ difScore: EASY_SCORE });
      } else if (results[currQues].difficulty === 'medium') {
        this.setState({ difScore: MEDIUM_SCORE });
      } else if (results[currQues].difficulty === 'hard') {
        this.setState({ difScore: HARD_SCORE });
      }

      this.setState({
        apiReturn: apiReturn.results,
        currAnswers: [...incorrectAnswers, correctAnswer]
          .sort(() => Math.random() - RANDOM_ASSIST),
      });
    }
  }

  handleTimer = () => {
    clearInterval(this.handleCounter);
    this.handleCounter = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
        isDisabled: false,
      }));
      const { time } = this.state;
      if (time === 0) {
        clearInterval(this.handleCounter);
        this.setState({
          isDisabled: true,
          time: 30,
        }, () => {
          const allButtons = [...document
            .getElementsByClassName(ClassBtn)];
          allButtons.forEach((button) => button.classList.add('wrong'));
        });
      }
    }, MIL);
  };

  answerButton = ({ target }) => {
    const { updateScore } = this.props;
    const { time } = this.state;
    if (target.dataset.testid === CORRECT_ANSWER) {
      const { difScore } = this.state;
      this
        .setState((prevState) => ({
          score: prevState.score + (BASE_SCORE + (time * difScore)),
        }), () => {
          const { score } = this.state;
          updateScore(score);
          localStorage.setItem('score', score);
        });
    }

    const allButtons = [...document
      .getElementsByClassName(ClassBtn)];
    allButtons.forEach((button) => {
      console.log(button);
      if (button.dataset.testid === CORRECT_ANSWER) {
        button.classList.add('correct');
      } else {
        button.classList.add('wrong');
      }
    });
  }

  nextQuestion() {
    this.setState((prevState) => ({
      currQues: prevState.currQues + 1,
    }), () => {
      const { currQues } = this.state;
      const { apiReturn } = this.state;
      const incorrectAnswers = apiReturn[currQues].incorrect_answers;
      const correctAnswer = apiReturn[currQues].correct_answer;

      this.setState({
        currAnswers: [...incorrectAnswers, correctAnswer]
          .sort(() => Math.random() - RANDOM_ASSIST),
      });
    });
    const allButtons = [...document
      .getElementsByClassName('game-main__answer-section__answer')];
    allButtons.forEach((button) => {
      if (button.dataset.testid === 'correct-answer') {
        button.classList.remove('correct');
      } else if (button.dataset.testid.indexOf('wrong') > INDEXOF_ASSIST) {
        button.classList.remove('wrong');
      }
    });
    this.setState({ time: 30 }, () => this.handleTimer());
  }

  render() {
    const { apiReturn, currQues, currAnswers, isDisabled, time } = this.state;
    const isFetching = !apiReturn.length > 0;

    return (
      <div className="game">
        <Header />
        {
          isFetching
            ? <h1 className="game-loading">{LOADING}</h1>
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
                      answer.match(apiReturn[currQues].correct_answer)
                        ? (
                          <button
                            type="button"
                            key={ i }
                            data-testid="correct-answer"
                            className="game-main__answer-section__answer"
                            disabled={ isDisabled }
                            onClick={ this.answerButton }
                          >
                            {answer}
                          </button>)
                        : (
                          <button
                            type="button"
                            key={ i }
                            data-testid={ `wrong-answer-${i}` }
                            className="game-main__answer-section__answer"
                            disabled={ isDisabled }
                            onClick={ this.answerButton }
                          >
                            {answer}
                          </button>)
                    ))}
                </section>
                <button
                  type="button"
                  data-testid="btn-next"
                  className="game-main__next-button"
                  onClick={ currQues < QUESTIONS_LENGTH - 1
                    ? this.nextQuestion
                    : undefined }
                >
                  Próxima questão
                </button>
              </main>
            )
        }
        <p>{ `timer: ${time}`}</p>
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
  renewToken(token) {
    dispatch(tokenAction(token));
  },
  updateScore(score) {
    dispatch(scoreAction(score));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
