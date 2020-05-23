import React from 'react';
import './sentence.component.css';

export default function Sentence(props) {

  // const handleChange = (event) => {
  //   props.setInputText(event.target.value);
  // }

  return (
      <section className="sentence-area">
        {/* {props.name} */}

        <div className="sentence-to-speech-area">
          <button className="add"></button>
          <span className="sentence-to-speech">{props.sentenceText}</span>
          <button className="new-sentence"></button>
        </div>
        <div className="result-area">
          <span className="correct"></span>
          <span className="correct"></span>
          <span className="incorrect"></span>
        </div>
      </section>
  );
}
