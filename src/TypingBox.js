import React, { useState, useEffect } from 'react';


const TypingBox = () => {
    const [typedText, setTypedText] = useState('');
    const [keyPressCount, setKeyPressCount] = useState(0);
    const [correctKeyPressCount, setCorrectKeyPressCount] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [timer, setTimer] = useState(300); // 5 minutes in seconds
    const [isTimerRunning, setIsTimerRunning] = useState(false);
  
    const generateRandomText = () => {
        const characters = 'asdfghjkl;';
        let randomText = '';
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomText += characters[randomIndex];
        }
        return randomText;
      };
    
      const [expectedText, setExpectedText] = useState(generateRandomText());
    
  
      const handleInputChange = (event) => {
        const inputText = event.target.value;
        setTypedText(inputText);
    
        // Compare the typed text with the expected text
        let correctCount = 0;
        for (let i = 0; i < inputText.length; i++) {
          if (inputText[i] === expectedText[i]) {
            correctCount++;
          }
        }
        setCorrectKeyPressCount(correctCount);
    
        // Calculate accuracy percentage
        const accuracyPercentage = (correctCount / expectedText.length) * 100 || 100;
        setAccuracy(accuracyPercentage.toFixed(2));
    
        // Update the key press count
        setKeyPressCount(inputText.length);
      };
    
      const handleStartTimer = () => {
        setIsTimerRunning(true);
      };
    
      const handleStopTimer = () => {
        setIsTimerRunning(false);
      };
    
      const handleResetTimer = () => {
        setTypedText('');
        setKeyPressCount(0);
        setCorrectKeyPressCount(0);
        setAccuracy(100);
        setTimer(300);
        setIsTimerRunning(false);
        setExpectedText(generateRandomText());
      };
    
      useEffect(() => {
        let interval;
        if (isTimerRunning) {
          interval = setInterval(() => {
            setTimer((prevTimer) => {
              if (prevTimer === 0) {
                clearInterval(interval);
                // Time's up, do any necessary actions
                return prevTimer;
              }
              return prevTimer - 1;
            });
          }, 1000);
        }
    
        return () => {
          clearInterval(interval);
        };
      }, [isTimerRunning]);
    
      useEffect(() => {
        // Calculate accuracy percentage based on the key press count and correct key press count
        const accuracyPercentage = (correctKeyPressCount / keyPressCount) * 100 || 100;
        setAccuracy(accuracyPercentage.toFixed(2));
      }, [keyPressCount, correctKeyPressCount]);
       
  return (
    <div className="typing-box">
      <h2>Typing Box</h2>
      <div className="expected-text">
        <p>{expectedText}</p>
      </div>
      <input
        type="text"
        value={typedText}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />
      <div className="typed-text">
        <p>{typedText}</p>
      </div>
      <div className="timer">
        <p>Time remaining: {timer}s</p>
      </div>
      <div className="key-press-count">
        <p>Keys pressed: {keyPressCount}</p>
      </div>
      <div className="accuracy">
        <p>Accuracy: {accuracy}%</p>
      </div>
      <div className="timer-controls">
        {isTimerRunning ? (
          <button className="stop-button" onClick={handleStopTimer}>
            Stop
          </button>
        ) : (
          <button className="start-button" onClick={handleStartTimer}>
            Start
          </button>
        )}
        <button className="reset-button" onClick={handleResetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TypingBox;
