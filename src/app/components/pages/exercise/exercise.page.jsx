import React from 'react';
import './exercise.page.css';

import Sentence from './sentence/sentence.component.jsx';
import Actions from './actions/actions.component.jsx';
import SpeechRecognition from '../../../components/speech-recognition-web-api/speech-recognition-web-api.component';
import Record from '../../record/record.component';

class Exercise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      record: new Record(),
      speechRecognition: new SpeechRecognition(),
      isRecording: false
    };
  }

  startSpeech = () => {
    // const speechRecognition = this.state.speechRecognition;
    // speechRecognition.startSpeechToText();

    // const isRecording = true;
    // this.setState({ isRecording });

    const record = this.state.record;
    record.micCue();
    const isRecording = true;
    this.setState({ isRecording });
  }

  stopSpeech = () => {
    // const speechRecognition = this.state.speechRecognition;
    // speechRecognition.stopSpeechToText();

    // const isRecording = false;
    // this.setState({ isRecording });
    // this.setResult();

    const record = this.state.record;
    record.micStop();
    const file = record.mountFile();
    console.log(file);
    const isRecording = false;
    this.setState({ isRecording });
  }

  setResult = () => {
    const speechRecognition = this.state.speechRecognition;
    const finalSpeech = speechRecognition.getFinalSpeech();

    console.log(
      "Final Speech: %c" + finalSpeech,
      "font-family:system-ui;font-size:1rem;font-weight:bold"
    );

    const expectedSentence = "Nice to meet you";
    const resultValue = (finalSpeech.toLowerCase() === expectedSentence.toLowerCase() );

    let results = this.state.results;
    results.push(resultValue);
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
      <Actions record={this.startSpeech} stop={this.stopSpeech} isRecording={this.state.isRecording}/>
    </div>);
  }
}

export default Exercise;
