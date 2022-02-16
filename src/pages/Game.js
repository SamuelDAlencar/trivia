import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaApi from '../services/triviaApi';
import { token as tokenAction } from '../redux/actions';
import requestToken from '../services/tokenApi';
import './Game.css';

const ERROR_RESPONSE = 3;
const QUESTIONS_LENGTH = 5;
const RANDOM_ASSIST = 0.5;
const LOADING = 'Loading...';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      apiReturn: [],
      currAnswers: [],
      currQues: 0,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.answerButton = this.answerButton.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
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

      this.setState({
        apiReturn: apiReturn.results,
        currAnswers: [...incorrectAnswers, correctAnswer]
          .sort(() => Math.random() - RANDOM_ASSIST),
      });
    }
  }

  handleClick =() => {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach((button) => {
      if (button.dataset.testid === 'correct-answer') {
        button.className = 'correct';
      } else {
        button.className = 'wrong';
      }
    });
  }

  answerButton() {
    this.setState((prevState) => ({
      currQues: prevState.currQues + 1,
    }), () => {
      const { currQues } = this.state;
      const { apiReturn } = this.state;
      const incorrectAnswers = apiReturn[currQues].incorrect_answers;
      const correctAnswer = apiReturn[currQues].correct_answer;

      this.setState({
        currAnswers: [...incorrectAnswers, correctAnswer]
          .sort(() => Math.random() - QUESTIONS_LENGTH),
      });
    });
  }

  render() {
    const { apiReturn, currQues, currAnswers } = this.state;
    const isFetching = !apiReturn.length > 0;

    return (
      <>
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
                            onClick={
                              currQues < QUESTIONS_LENGTH - 1
                                ? this.answerButton
                                : undefined
                            }
                          >
                            {answer}
                          </button>)
                        : (
                          <button
                            type="button"
                            key={ i }
                            data-testid={ `wrong-answer-${i}` }
                            className="game-main__answer-section__answer"
                            onClick={
                              currQues < QUESTIONS_LENGTH - 1
                                ? this.answerButton
                                : undefined
                            }
                          >
                            {answer}
                          </button>)
                    ))}
                </section>
              </main>
            )
        }
      </>
    );
  }
}

Game.propTypes = {
  renewToken: propTypes.func,
  token: propTypes.object,
}.isRequired;

const mapStateToProps = (state) => {
  const { token } = state;
  return {
    token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  renewToken(token) {
    dispatch(tokenAction(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
