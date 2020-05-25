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
      speechRecognition: new SpeechRecognition(),
      isRecording: false
    };
  }

  startSpeech = () => {
    const isRecording = true;
    const speechRecognition = this.state.speechRecognition;
    speechRecognition.startSpeechToText();

    let results = this.state.results;
    const randomBoolean = (Math.random() >= 0.5);
    results.push(randomBoolean);
    if (results.length > 3) {
      results.shift();
    }

    this.setState({ results, isRecording });
  }

  stopSpeech = () => {
    const speechRecognition = this.state.speechRecognition;
    const isRecording = false;
    speechRecognition.stopSpeechToText();
    this.setState({ isRecording });
    const finalSpeechResult = speechRecognition.finalSpeechResult.join(" ");

      console.log(
        "Final Speech: %c" + finalSpeechResult,
        "font-family:system-ui;font-size:1rem;font-weight:bold"
      );
  }

  render() {
    return (
    <div className="exercise-wrapper">
      <section className="topbar-area"></section>
      <section className="listener-area"></section>
      <Sentence sentenceText="Nice to meet you" results={this.state.results} />
      <Actions record={this.startSpeech} stop={this.stopSpeech} isRecording={this.state.isRecording}/>
    </div>);
  }
}

export default Exercise;
