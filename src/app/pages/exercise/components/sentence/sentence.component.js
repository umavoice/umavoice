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
          <button className="refresh"></button>
        </div>
      </section>
  );
}
