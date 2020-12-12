import React from 'react';
import './sentence.component.css';

type SentenceInfo = {
  word: string,
  phoneticValue: string
}

type SentenceProps = {
  sentenceInfo: SentenceInfo[],
  results: Boolean[],
  setWordSelected: (wordSelected: string) => void,
  wordSelected: string
}

export default function Sentence(props: SentenceProps) {

  const sentenceInfo = props.sentenceInfo;
  const results = props.results;
  const setWordSelected = props.setWordSelected;
  const wordSelected = props.wordSelected;

  return (
      <section className="sentence-area">
        <div className="phonetic-area">
          <span className="unselected">Tap the word for more info</span>
        </div>
        <div className="sentence-to-speech">
          {sentenceInfo.map((wordInfo, index) => {
            return <span key={index} className={(wordSelected === wordInfo.word ? "word selected" : "word")} onClick={() => setWordSelected(wordInfo.word)}>
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
