import React from 'react';
import './sentence.component.css';

type SentenceProps = {
  sentenceText: String,
  results: Boolean[]
}

export default function Sentence(props: SentenceProps) {

  const sentenceText = props.sentenceText;
  const results = props.results;

  return (
      <section className="sentence-area">
        <div className="sentence-to-speech-area">
          <button className="add"></button>
          <span className="sentence-to-speech">{sentenceText}</span>
          <button className="new-sentence"></button>
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
