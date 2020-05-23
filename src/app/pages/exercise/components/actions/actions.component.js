import React from 'react';
import './actions.component.css';

export default function Actions(props) {

  const record = props.record;

  return (
      <section className="actions-area">
        <button className="listen" ></button>
        <button className="talk" onClick={record}></button>
      </section>
  );
}
