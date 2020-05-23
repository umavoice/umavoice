import React from 'react';
import './exercise.page.css';

import Sentence from './components/sentence/sentence.component';
import Actions from './components/actions/actions.component';

class Exercise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  clickTest = () => {
    let results = this.state.results;
    const randomBoolean = (Math.random() >= 0.5);
    results.push(randomBoolean);
    if (results.length > 3) {
      results.shift();
    }
    this.setState({ results });
  }

  render() {
    return (
    <div className="exercise-wrapper">
      <section className="topbar-area"></section>
      <section className="listener-area"></section>
      <Sentence sentenceText="Nice to meet you" results={this.state.results} />
      {/* <section className="actions-area">
        <button onClick={this.clickTest}>clickme</button>
      </section> */}
      <Actions/>
    </div>);
  }
}

export default Exercise;