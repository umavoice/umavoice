import React from 'react';
import './listener.component.css';

export default function Listener(props: any) {

  return (
      <section className="listener-area">
        <div className="listener-wrapper">
        <img 
          src={require('../../../../../assets/images/listener-one.svg')}
          alt="Listener Default Expression">
        </img>

        <div className="bubble">
          <p>That's it!</p>
          <p>Good job!</p>
        </div>
        </div>
      </section>
  );
}
