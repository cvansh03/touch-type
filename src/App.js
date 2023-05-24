import React from 'react';
import Keyboard from './Keyboard';
import TypingBox from './TypingBox';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1>Touch Typing Practice</h1>
      <div className="container">
        <Keyboard />
        <TypingBox />
      </div>
    </div>
  );
}

export default App;
