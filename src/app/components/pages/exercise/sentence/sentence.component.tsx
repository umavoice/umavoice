import React from 'react';
import './sentence.component.css';

type SentenceInfo = {
  word: string,
  phoneticValue: string
}

type SentenceProps = {
  sentenceInfo: SentenceInfo[],
  results: Boolean[]
}

export default function Sentence(props: SentenceProps) {

  const sentenceInfo = props.sentenceInfo;
  const results = props.results;

  return (
      <section className="sentence-area">
        <div className="phonetic-area">
          
        </div>
        <div className="sentence-to-speech">
          {sentenceInfo.map((wordInfo, index) => {
            return <span key={index} className="word">{wordInfo.word}</span>;
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
