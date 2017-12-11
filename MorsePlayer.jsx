/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import morseMap from './morse_map';
import './master.css';

const TIME_BETWEEN_LOOPS = 1000;

export default class MorsePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      curQuarterBeatIdx: null,
    };
    this.quarterBeats = this.getQuarteBeats();
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    if (this.props.autoPlay) this.play();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
  }

  getQuarteBeats() {
    const morse = this.props.word.toLowerCase().split('').map(letter => morseMap[letter]).join(' ');
    return this.quarterify(morse);
  }

  quarterify(morse) {
    const res = [];
    morse.split('').forEach((char) => {
      if (char === '.') {
        for (let i = 0; i < 3; i += 1) res.push(true);
        res.push(false);
      } else if (char === '-') {
        for (let i = 0; i < 7; i += 1) res.push(true);
        res.push(false);
      } else {
        for (let i = 0; i < 4; i += 1) res.push(false);
      }
    });
    return res;
  }

  isOn() {
    return this.quarterBeats[this.state.curQuarterBeatIdx];
  }

  play() {
    this.timeout1 = setTimeout(() => {
      this.startFlashing();
    }, 1000);
  }

  startFlashing() {
    if (this.interval) return;

    this.setState({
      curQuarterBeatIdx: 0,
      playing: true,
    });

    this.interval = setInterval(() => {
      this.setState({
        curQuarterBeatIdx: this.state.curQuarterBeatIdx + 1,
      });
      if (this.state.curQuarterBeatIdx >= this.quarterBeats.length) {
        this.pause();
        if (this.props.loop) {
          this.timeout2 = setTimeout(() => {
            this.play();
          }, TIME_BETWEEN_LOOPS);
        }
      }
    }, this.props.speed / 4);
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      playing: false,
    });
  }

  togglePlay() {
    this.state.playing ? this.pause() : this.play();
  }

  render() {
    const onOff = this.isOn() ? 'on' : 'off';
    return (
      <div>
        {!this.props.autoPlay &&
          <button onClick={this.togglePlay}>
            {this.state.playing ? 'Pause' : 'Play'}
          </button>
        }
        <img
          className={`lightbulb ${onOff}`}
          alt="lightbulb"
          src={`./images/light_bulb_${onOff}.png`}
        />
      </div>
    );
  }
}
