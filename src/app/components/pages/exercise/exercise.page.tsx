import React from 'react';
import './exercise.page.css';

import SpeechToText from '../../../../interfaces/speech-to-text';
import Listener from './listener/listener.component';
import Sentence from './sentence/sentence.component';
import Actions from './actions/actions.component';
import SpeechRecognitionWebApi from '../../services/speech-recognition-web-api.component';
import MediaRecorderWebApi from '../../services/media-recorder.component';
import { getPronunciation } from '../../services/wiktionary';

type ExerciseProps = {
  serverSpeechValidation: boolean;
}

type ExerciseState = {
  results: Boolean[],
  speechToText: SpeechToText,
  isRecording: Boolean,
  sentenceInfo: SentenceInfo[],
  wordSelected: string
}

type SentenceInfo = {
  word: string,
  phoneticValue: string
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
      isRecording: false,
      sentenceInfo: [{word: "loading...", phoneticValue: ""}],
      wordSelected: ""
    };
  }

  componentDidMount() {
    this.setSentenceInfo();
  }

  private sentenceText = "Nice to meet you";

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

  setSentenceInfo = async () => {
    const sentenceText = this.sentenceText;
    const words = sentenceText.split(" ");
    let sentenceInfo: SentenceInfo[] = [];

    for (const word of words) {
      const phoneticValue = await getPronunciation(word);
      sentenceInfo.push({word, phoneticValue});
    }

    this.setState({ sentenceInfo });
  }

  setWordSelected = (wordSelected: string) => {

    console.log(wordSelected);
    this.setState({ wordSelected });
  }

  render() {
    return (
    <div className="exercise-wrapper">
      <Listener></Listener>
      <Sentence sentenceInfo={this.state.sentenceInfo} results={this.state.results} setWordSelected={this.setWordSelected} wordSelected={this.state.wordSelected}/>
      <Actions record={this.startSpeech} stop={this.stopSpeech} isRecording={this.state.isRecording}/>
    </div>);
  }
}

export default Exercise;
