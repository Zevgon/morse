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
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.changeWord = this.changeWord.bind(this);
  }

  togglePlay() {
    this.setState({
      running: !this.state.running,
    });
  }

  changeWord() {
    this.setState({
      word: words.sample(),
      running: false,
    });
  }

  render() {
    console.log(this.state.word);
    return (
      <div className="game-container">
        <button onClick={this.togglePlay}>
          {this.state.running ? 'Stop' : 'Start'}
        </button>
        <button onClick={this.changeWord}>Change word</button>
        {this.state.running &&
          <MorsePlayer speed={300} word={this.state.word} autoPlay loop />
        }
      </div>
    );
  }
}
