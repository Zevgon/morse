/* eslint-disable jsx-a11y/audio-has-caption */
import React, { Component } from 'react';
import MorsePlayer from './MorsePlayer';

const query = 'https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=3&maxLength=7&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

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
      showCongrats: false,
      showAnswer: false,
      audioOn: true,
      speed: 300,
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.changeWord = this.changeWord.bind(this);
    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.updateWord = this.updateWord.bind(this);
  }

  togglePlay() {
    this.setState({
      running: !this.state.running,
      showCongrats: false,
    });
  }

  changeWord(useLocalDict = true) {
    if (useLocalDict) {
      this.setState({
        word: words.sample(),
        running: false,
        showCongrats: false,
      });
    } else {
      fetch(query)
        .then(res => res.json())
        .then((data) => {
          this.setState({
            word: data[0].word.toLowerCase(),
            running: false,
            showCongrats: false,
          });
        });
    }
  }

  toggleAnswer() {
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  toggleAudio() {
    this.setState({ audioOn: !this.state.audioOn });
  }

  changeSpeed(e) {
    if (!/^\d*$/.test(e.target.value)) {
      this.setState({
        speedError: 'Invalid speed. Digits only.',
        running: false,
      });
    } else {
      this.setState({
        speed: e.target.value,
        speedError: '',
        running: false,
      });
    }
  }

  updateWord(e) {
    if (!/^[\d\w ]*$/.test(e.target.value)) {
      this.setState({
        textError: 'Sorry, letters and numbers only',
      });
    } else {
      this.setState({
        word: e.target.value,
        textError: '',
      });
    }
  }

  render() {
    return (
      <div className="game-container">
        <button onClick={this.togglePlay}>
          {this.state.running ? 'Stop' : 'Start'}
        </button>
        <button onClick={this.changeWord}>
          Change word (random from small selection)
        </button>
        <button onClick={() => this.changeWord(false)}>
          Change word (random from weird dictionary)
        </button>
        <button onClick={this.toggleAudio}>
          {this.state.audioOn ? 'Turn audio off' : 'Turn audio on'}
        </button>
        Speed (milliseconds per beat - the lower the faster)
        {this.state.speedError &&
          <div>{this.state.speedError}</div>
        }
        <input
          type="text"
          value={this.state.speed}
          onChange={this.changeSpeed}
        />
        <button
          onClick={() => this.setState({ speed: 300, running: false })}
        >Reset to default speed
        </button>
        <button onClick={this.toggleAnswer}>
          {this.state.showAnswer ? 'Hide current text' : 'Show current text'}
        </button>
        {this.state.showAnswer &&
          <div>
            <div>Current text:</div>
            <textarea
              style={{ height: 100, width: 400 }}
              type="text"
              value={this.state.word}
              onChange={this.updateWord}
            />
          </div>
        }
        {this.state.textError &&
          <div>{this.state.textError}</div>
        }
        {this.state.showCongrats &&
          <div>Yay you did it!!</div>
        }
        {this.state.running &&
          <div className="game-container">
            <MorsePlayer
              speed={this.state.speed || 300}
              word={this.state.word}
              audioOn={this.state.audioOn}
              autoPlay
              loop
            />
          </div>
        }
      </div>
    );
  }
}
