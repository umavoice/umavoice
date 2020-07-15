import React from 'react';
import './actions.component.css';

export default function Actions(props: any) {

  const record = props.record;
  const stop = props.stop;
  const isRecording = props.isRecording;

  const getButton = () => {
    if (isRecording) {
      return <button className="stop" onClick={stop}></button>
    }
    else {
      return <button className="talk" onClick={record}></button>
    }
  }

  return (
      <section className="actions-area">
        <button className="arrow left"></button>
        <div className="center-actions">
          <button className="listen"></button>
          {getButton()}
        </div>
        <button className="arrow right"></button>
      </section>
  );
}
