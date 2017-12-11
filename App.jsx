/* eslint-disable no-extend-native */
import React, { Component } from 'react';
import MorsePlayer from './MorsePlayer';

const query = 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=3&maxLength=7&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

Array.prototype.sample = function () {
  const randIdx = Math.floor(Math.random() * this.length);
  return this[randIdx];
};

const words = [
  'shell',
  'halls',
  'slick',
  'trick',
  'boxes',
  'leaks',
  'strobe',
  'bistro',
  'flick',
  'bombs',
  'break',
  'brick',
  'steak',
  'sting',
  'vector',
  'beats',
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
      word: words.sample(),
      guess: '',
      showCongrats: false,
      showAnswer: false,
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.changeWord = this.changeWord.bind(this);
    this.handleGuessChange = this.handleGuessChange.bind(this);
    this.toggleAnswer = this.toggleAnswer.bind(this);
  }

  togglePlay() {
    this.setState({
      running: !this.state.running,
      showCongrats: false,
    }, () => {
      if (this.state.running) this.inputNode.focus();
    });
  }

  changeWord(useLocalDict = true) {
    if (useLocalDict) {
      this.setState({
        word: words.sample(),
        running: false,
        guess: '',
        showCongrats: false,
      });
    } else {
      fetch(query)
        .then(res => res.json())
        .then((data) => {
          this.setState({
            word: data[0].word.toLowerCase(),
            running: false,
            guess: '',
            showCongrats: false,
          });
        });
    }
  }

  handleGuessChange(e) {
    const value = e.target.value.toLowerCase().trim();
    this.setState({ guess: value }, () => {
      if (value === this.state.word) {
        this.setState({
          running: false,
          showCongrats: true,
        });
      }
    });
  }

  toggleAnswer() {
    this.setState({
      showAnswer: !this.state.showAnswer,
    });
  }

  render() {
    return (
      <div className="game-container">
        <button onClick={this.togglePlay}>
          {this.state.running ? 'Stop' : 'Start'}
        </button>
        <button onClick={this.changeWord}>
          Change word (small selection)
        </button>
        <button onClick={() => this.changeWord(false)}>
          Change word (weird dictionary)
        </button>
        <button onClick={this.toggleAnswer}>
          {this.state.showAnswer ? 'Hide answer' : 'Show answer'}
        </button>
        {this.state.showCongrats &&
          <div>Yay you did it!!</div>
        }
        {this.state.showAnswer &&
          <div>Answer: {this.state.word}</div>
        }
        {this.state.running &&
          <MorsePlayer speed={300} word={this.state.word} autoPlay loop />
        }
        <input
          ref={(node) => { this.inputNode = node; }}
          type="text"
          value={this.state.guess}
          onChange={this.handleGuessChange}
        />
      </div>
    );
  }
}
