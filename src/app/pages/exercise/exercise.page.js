import React from 'react';
import './exercise.page.css';

import Sentence from './components/sentence/sentence.component'

class Exercise extends React.Component {
  render() {
    return (
    <div className="exercise-wrapper">
      <section className="topbar-area"></section>
      <section className="listener-area"></section>
      <Sentence sentenceText="Nice to meet you" />
      <section className="actions-area"></section>
    </div>);
  }
}

export default Exercise;