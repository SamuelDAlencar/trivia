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
const INDEXOF_ASSIST = -1;
const LOADING = 'Loading...';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      apiReturn: [],
      currAnswers: [],
      currQues: 0,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
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

  answerButton = () => {
    const allButtons = [...document
      .getElementsByClassName('game-main__answer-section__answer')];

    allButtons.forEach((button) => {
      console.log(button);
      if (button.dataset.testid === 'correct-answer') {
        button.classList.add('correct');
      } else {
        button.classList.add('wrong');
      }
    });
  }

  redToFeedback = () => {
    const { history } = this.props;
    history.push('/feedback');
  }

  nextQuestion = () => {
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
    const allButtons = [...document
      .getElementsByClassName('game-main__answer-section__answer')];
    allButtons.forEach((button) => {
      if (button.dataset.testid === 'correct-answer') {
        button.classList.remove('correct');
      } else if (button.dataset.testid.indexOf('wrong') > INDEXOF_ASSIST) {
        button.classList.remove('wrong');
      }
    });
  }

  render() {
    const { apiReturn, currQues, currAnswers } = this.state;
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
                            onClick={ this.answerButton }
                          >
                            {answer}
                          </button>)
                    ))}
                </section>
                {
                  currQues < QUESTIONS_LENGTH - 1
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
                      </button>)
                }
              </main>
            )
        }
      </div>
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
