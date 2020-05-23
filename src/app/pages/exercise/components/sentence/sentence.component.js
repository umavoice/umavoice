import React from 'react';
import './sentence.component.css';

export default function Sentence(props) {

  const sentenceText = props.sentenceText;
  const results = props.results;

  return (
      <section className="sentence-area">
        {/* {props.name} */}

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
