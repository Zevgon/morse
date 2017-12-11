/* eslint-disable no-extend-native */
import React, { Component } from 'react';
import MorsePlayer from './MorsePlayer';

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
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.changeWord = this.changeWord.bind(this);
    this.handleGuessChange = this.handleGuessChange.bind(this);
  }

  togglePlay() {
    this.setState({
      running: !this.state.running,
      showCongrats: false,
    }, () => {
      if (this.state.running) this.inputNode.focus();
    });
  }

  changeWord() {
    this.setState({
      word: words.sample(),
      running: false,
      guess: '',
      showCongrats: false,
    });
  }

  handleGuessChange(e) {
    const { value } = e.target;
    this.setState({ guess: value }, () => {
      if (value === this.state.word) {
        this.setState({
          running: false,
          showCongrats: true,
        });
      }
    });
  }

  render() {
    return (
      <div className="game-container">
        <button onClick={this.togglePlay}>
          {this.state.running ? 'Stop' : 'Start'}
        </button>
        <button onClick={this.changeWord}>Change word</button>
        {this.state.showCongrats &&
          <div>Yay you did it!!</div>
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
