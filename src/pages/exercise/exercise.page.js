import React from 'react';
import './exercise.page.css';

import Sentence from './components/sentence/sentence.component'

class Exercise extends React.Component {
  render() {
    return (
    <div class="exercise-wrapper">
      <section class="topbar-area"></section>
      <section class="listener-area"></section>
      <section class="sentence-area">
        <Sentence name="hello" />
      </section>
      <section class="actions-area"></section>
    </div>);
  }
}

export default Exercise;