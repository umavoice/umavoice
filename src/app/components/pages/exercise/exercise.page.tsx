import React from 'react';
import './exercise.page.css';

import SpeechToText from '../../../../interfaces/speech-to-text';
import Listener from './listener/listener.component';
import Sentence from './sentence/sentence.component';
import Actions from './actions/actions.component';
import SpeechRecognitionWebApi from '../../speech-recognition-web-api/speech-recognition-web-api.component';
import MediaRecorderWebApi from '../../media-recorder/media-recorder.component';

type ExerciseProps = {
  serverSpeechValidation: boolean;
}

type ExerciseState = {
  results: Boolean[],
  speechToText: SpeechToText,
  isRecording: Boolean
}

class Exercise extends React.Component<ExerciseProps, ExerciseState> {

  constructor(props: ExerciseProps) {
    super(props);

    let speechToText;
    if (props.serverSpeechValidation) {
      speechToText = new MediaRecorderWebApi();
    }
    else {
      speechToText = new SpeechRecognitionWebApi();
    }

    this.state = {
      results: [],
      speechToText: speechToText,
      isRecording: false
    };
  }

  startSpeech = async () => {
    const speechToText = this.state.speechToText;
    const recordingStarted = await speechToText.startSpeechToText();

    if (recordingStarted) {
      const isRecording = true;
      this.setState({ isRecording });
    }
  }

  stopSpeech = () => {
    const speechToText = this.state.speechToText;
    speechToText.stopSpeechToText();

    const isRecording = false;
    this.setState({ isRecording });
    this.setResult();

  }

  setResult = async () => {
    const speechToText = this.state.speechToText;
    const finalSpeech = await speechToText.getFinalSpeech();

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
      <Listener></Listener>
      <Sentence sentenceText="Nice to meet you" results={this.state.results} />
      <Actions record={this.startSpeech} stop={this.stopSpeech} isRecording={this.state.isRecording}/>
    </div>);
  }
}

export default Exercise;
