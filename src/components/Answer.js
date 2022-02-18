import React, { Component } from 'react';
import propTypes from 'prop-types';
import { decode } from 'he';

export default class Answer extends Component {
  render() {
    const { answers, isDisabled, apiReturn, currQues, answerButton } = this.props;
    return (
      answers
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
            onClick={ answerButton }
          >
            {decode(answer)}
          </button>
        ))
    );
  }
}

Answer.propTypes = {
  answers: propTypes.array,
  isDisabled: propTypes.bool,
  apiReturn: propTypes.array,
  currQues: propTypes.number,
  answerButton: propTypes.func,
  correct_answer: propTypes.string,
}.isRequired;
