import React from 'react';
import './exercise.page.css';

class Exercise extends React.Component {
  render() {
    return <div 
    class="exercise-wrapper">
      <section class="topbar"></section>
      <section class="listener-area"></section>
      <section class="sentence-area"></section>
      <section class="actions-area"></section>
    </div>;
  }
}

export default Exercise;