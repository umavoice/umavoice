import React from 'react';
import './App.css';
import Exercise from './components/pages/exercise/exercise.page.jsx'

const name = "MyName";

function App() {
  return (
    <Exercise name={name}/>
  );
}

export default App;
