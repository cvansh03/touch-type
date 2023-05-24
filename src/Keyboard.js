import React from 'react';

const Keyboard = () => {
  // Define the keys to be displayed
  const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

  return (
    <div className="keyboard">
      <h2>Keyboard</h2>
      <div className="keys">
        {keys.map((key) => (
          <div className="key" key={key}>
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
