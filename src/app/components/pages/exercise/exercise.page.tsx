import React from 'react';
import './exercise.page.css';

import SpeechToText from '../../../../interfaces/speech-to-text';
import Listener from './listener/listener.component';
import Sentence from './sentence/sentence.component';
import Actions from './actions/actions.component';
import SpeechRecognitionWebApi from '../../services/speech-recognition-web-api.component';
import { getPronunciation } from '../../services/wiktionary';

type ExerciseProps = {
  serverSpeechValidation: boolean;
}

type ExerciseState = {
  result: Result[],
  useKey: boolean,
  speechToText: SpeechToText,
  isRecording: Boolean,
  sentenceInfo: WordInfo[],
  wordSelected: WordInfo,
  speechListenerStatus: string
}

type WordInfo = {
  word: string,
  phoneticValue: string
}

type Result = {
  value: boolean,
  key: string
}

class Exercise extends React.Component<ExerciseProps, ExerciseState> {

  constructor(props: ExerciseProps) {
    super(props);

    let speechToText;
    speechToText = new SpeechRecognitionWebApi();

    this.state = {
      result: [],
      useKey: false,
      speechToText: speechToText,
      isRecording: false,
      sentenceInfo: [{word: "loading...", phoneticValue: ""}],
      wordSelected: {word: "", phoneticValue: ""},
      speechListenerStatus: ""
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

    this.setResult();
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
    const finalSpeech = await speechToText.getSpeech();

    console.log(
      "Final Speech: %c" + finalSpeech,
      "font-family:system-ui;font-size:1rem;font-weight:bold"
    );

    const expectedSentence = "Nice to meet you";
    const value = (finalSpeech.toLowerCase() === expectedSentence.toLowerCase() );

    let result = this.state.result;
    result.push({value, key: String(Math.random())});
    if (result.length > 3) {
      const useKey = true;
      this.setState({ useKey });
      result.shift();
      result.forEach(element => {
        element.key = String(Math.random());
      });
    }

    this.setState({ result });

    let speechListenerStatus = value ? "correct" : "incorrect";

    if (this.state.result.length === 3) {
      let countCorrectResults = 0;
      for (const element of this.state.result) {
        if (element.value) {
          countCorrectResults++;
        }
      }

      if (countCorrectResults === 3) {
        console.log("Done");
        this.stopSpeech();

        speechListenerStatus = "all-correct";
      }
    }

    this.setState({ speechListenerStatus });

    if (this.state.isRecording) {
      this.setResult();
    }
  }

  setSentenceInfo = async () => {
    const sentenceText = this.sentenceText;
    const words = sentenceText.split(" ");
    let sentenceInfo: WordInfo[] = [];

    for (const word of words) {
      const phoneticValue = await getPronunciation(word);
      sentenceInfo.push({word, phoneticValue});
    }

    this.setState({ sentenceInfo });
  }

  setWordSelected = (wordSelected: WordInfo) => {

    if (wordSelected.word === this.state.wordSelected.word) {
      wordSelected = {word: "", phoneticValue: ""};
    }
    this.setState({ wordSelected });
  }

  getSpeechBubbleinfo() {



  }

  render() {
    return (
    <div className="exercise-wrapper">
      <Listener speechListenerStatus={this.state.speechListenerStatus}></Listener>
      <Sentence sentenceInfo={this.state.sentenceInfo} results={this.state.result} useKey={this.state.useKey} speechListenerStatus={this.state.speechListenerStatus} setWordSelected={this.setWordSelected} wordSelected={this.state.wordSelected}/>
      <Actions record={this.startSpeech} stop={this.stopSpeech} isRecording={this.state.isRecording}/>
    </div>);
  }
}

export default Exercise;
