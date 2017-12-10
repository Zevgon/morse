/* eslint-disable no-extend-native */
import React from 'react';
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

const App = () => (
  <div>
    <MorsePlayer speed={300} word={words.sample()} autoPlay loop />
  </div>
);

export default App;
