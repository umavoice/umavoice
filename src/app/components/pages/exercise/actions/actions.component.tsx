import React from 'react';
import './actions.component.css';

export default function Actions(props: any) {

  const record = props.record;
  const stop = props.stop;
  const isRecording = props.isRecording;

  const getButton = () => {
    if (isRecording) {
      return <button className="stop" onClick={stop}>
        <img
          src={require('../../../../../assets/images/stop.svg')}
          alt="Stop recording">
        </img>
      </button>
    }
    else {
      return <button className="talk" onClick={record}>
        <img
          src={require('../../../../../assets/images/microphone.svg')}
          alt="Start recording">
        </img>
      </button>
    }
  }

  return (
      <section className="actions-area">
        <button className="arrow left">
          <img
            src={require('../../../../../assets/images/arrow.svg')}
            alt="Previous Exercise">
          </img>
        </button>

        <div className="center-actions">
          <button className="listen">
            <img
              src={require('../../../../../assets/images/listening.svg')}
              alt="Listen to example">
            </img>
          </button>
          {getButton()}
        </div>

        <button className="arrow right">
          <img
            src={require('../../../../../assets/images/arrow.svg')}
            alt="Next Exercise">
          </img>
        </button>
      </section>
  );
}
