import React from 'react';
import './listener.component.css';

export default function Listener(props: any) {

  const chatBubble = (value: any) => {

    console.log(value.speechListenerStatus);

    let message = <div className="bubble">
                    <p>That's it!</p>
                    <p>Good job!</p>
                  </div>

    if (value === "correct") {
      message =  <div className="bubble">
                    <p>Nice!</p>
                  </div>
    }

    if (value === "incorrect") {
      message =  <div className="bubble">
                    <p>Try again!</p>
                  </div>
    }

    return message
  }

  return (
      <section className="listener-area">
        <div className="listener-wrapper">
        <img 
          src={require('../../../../../assets/images/listener-one.svg')}
          alt="Listener Default Expression">
        </img>

        { props.speechListenerStatus ? chatBubble(props.speechListenerStatus) : "" }
        </div>
      </section>
  );
}
