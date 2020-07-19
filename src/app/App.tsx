import React from 'react';
import './App.css';
import Exercise from './components/pages/exercise/exercise.page'

function App() {
  return (
    <Exercise serverSpeechValidation={false}/>
  );
}

export default App;
