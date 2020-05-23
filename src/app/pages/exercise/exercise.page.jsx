import React from 'react';
import './exercise.page.css';

import Sentence from './components/sentence/sentence.component.jsx';
import Actions from './components/actions/actions.component.jsx';
import SpeechRecognition from './components/speech-recognition';

class Exercise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      speechRecognition: new SpeechRecognition()
    };
  }

  clickTest = () => {
    let results = this.state.results;
    const speechRecognition = new SpeechRecognition();
    speechRecognition.startSpeechToText();
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
      <Actions record={this.clickTest}/>
    </div>);
  }
}

export default Exercise;