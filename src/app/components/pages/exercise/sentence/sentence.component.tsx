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
        <span className="sentence-to-speech">{sentenceText}</span>
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
