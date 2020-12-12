import React from 'react';
import './sentence.component.css';

type WordInfo = {
  word: string,
  phoneticValue: string
}

type SentenceProps = {
  sentenceInfo: WordInfo[],
  results: Boolean[],
  setWordSelected: (wordSelected: WordInfo) => void,
  wordSelected: WordInfo
}

export default function Sentence(props: SentenceProps) {

  const sentenceInfo = props.sentenceInfo;
  const results = props.results;
  const setWordSelected = props.setWordSelected;
  const wordSelected = props.wordSelected;
  
  const phoneticArea = () => {

    if (wordSelected.phoneticValue) {
      return <span>{wordSelected.phoneticValue}</span>;
    }
    return <span className="unselected"> Tap the word for more info </span>;
  }

  return (
      <section className="sentence-area">
        <div className="phonetic-area">{phoneticArea()}</div>
        <div className="sentence-to-speech">
          {sentenceInfo.map((wordInfo, index) => {
            return <span key={index} className={(wordSelected.word === wordInfo.word) ? "word selected" : "word"} onClick={() => setWordSelected(wordInfo)}>
                      {wordInfo.word}
                    </span>;
          })}
        </div>
        <div className="result-area">
          {results.map((result, index) => {
            if (result) {
              return <span key={index} className="correct"></span>;
            }
            else {
              return <span key={index} className="incorrect"></span>;
            }
          })}
        </div>
      </section>
  );
}
