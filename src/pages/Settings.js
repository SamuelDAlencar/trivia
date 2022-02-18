import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { settingsAction } from '../redux/actions';
import './style/Settings.css';

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      difficulty: '',
      type: '',
    };
  }

  handleSelect = ({ target }) => {
    const { value, id } = target;
    this.setState({ [id]: value });
  }

  saveSettings = () => {
    const { setSettings } = this.props;
    const { category, difficulty, type } = this.state;
    setSettings(
      `&category=${category}`,
      `&difficulty=${difficulty}`,
      `&type=${type}`,
    );
    window.alert('Settings Saved!');
  }

  homeButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div data-testid="settings-title" className="settingsScreen">
        <h1 className="headerSettings">Settings</h1>
        <section className="container">
          <label htmlFor="category" className="settings__label">
            Questions Category:
            <select className="select" id="category" onChange={ this.handleSelect }>
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
          </label>
          <label htmlFor="difficulty" className="settings__label">
            Difficulty:
            <select className="select" id="difficulty" onChange={ this.handleSelect }>
              <option value="any">Any difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type" className="settings__label">
            Questions Type:
            <select className="select" id="type" onChange={ this.handleSelect }>
              <option value="any">Any type</option>
              <option value="multiple">Multiple choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>

          <div className="btns">
            <button
              className="btn1"
              type="button"
              onClick={ this.saveSettings }
            >
              Save Settings
            </button>
            <button
              className="btn2"
              type="button"
              onClick={ this.homeButton }
            >
              Home
            </button>
          </div>
        </section>
      </div>
    );
  }
}

Settings.propTypes = {
  push: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setSettings(category, difficulty, type) {
    dispatch(settingsAction(category, difficulty, type));
  },
});

export default connect(null, mapDispatchToProps)(Settings);
