import React, { useState } from 'react';
import './App.css';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    const min = 1000;
    const max = 9999;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(random);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="header">ZEPP-LIFE</h1>
        <button onClick={generateRandomNumber}>Синхронізація</button>
        {randomNumber !== null && <p>Кількість зроблених кроків: {randomNumber}</p>}
      </div>
    </div>
  );
}

export default App;
