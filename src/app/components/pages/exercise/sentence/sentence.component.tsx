import React from 'react';
import './sentence.component.css';

type SentenceProps = {
  sentenceText: String,
  results: Boolean[]
}

export default function Sentence(props: SentenceProps) {

  const sentenceText = props.sentenceText;
  const results = props.results;

  const sentenceWords = () => {
    const returnValue: string[] = sentenceText.split(" ");
    return returnValue;
  }

  return (
      <section className="sentence-area">
        <div className="sentence-to-speech">
          {sentenceWords().map((word, index) => {
            return <span key={index} className="word">{word}</span>;
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
