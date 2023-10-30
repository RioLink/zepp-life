import React, { useState } from 'react';
import './App.css';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [goals, setGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [weight, setWeight] = useState(null);
  const [waistSize, setWaistSize] = useState(null);
  const [hoursOfSleep, setHoursOfSleep] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const generateRandomNumber = () => {
    const min = 0;
    const max = 100;

    // Генерация случайного числа для шагов
    const randomSteps = Math.floor(Math.random() * (max - min + 1000)) + min;

    // Установка случайного числа в состояние
    setRandomNumber(randomSteps);

    // Остальная логика
    const randomWeight = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomWaistSize = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomHoursOfSleep = Math.floor(Math.random() * (max - min + 1)) + min;

    setWeight(randomWeight);
    setWaistSize(randomWaistSize);
    setHoursOfSleep(randomHoursOfSleep);

    const randomPercentage = Math.floor(
      (randomWeight + randomWaistSize + randomHoursOfSleep) / 3
    );
    setPercentage(randomPercentage);
  };

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const completeGoal = (index) => {
    const goalToComplete = goals[index];
    setCompletedGoals([...completedGoals, goalToComplete]);
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const deleteCompletedGoal = (index) => {
    const updatedCompletedGoals = completedGoals.filter((_, i) => i !== index);
    setCompletedGoals(updatedCompletedGoals);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="header">ZEPP-LIFE</h1>
        <button onClick={generateRandomNumber}>Синхронізація</button>
        <p>Кількість зроблених кроків: <span className="number">{randomNumber !== null ? randomNumber : 'Нет данных'}</span></p>
        <div className="horizontal-line"></div>
        <div className="indicators">
          <h2>Ваші бажані показники</h2>
          <p>Вес: {weight}</p>
          <p>Розмір талії: {waistSize}</p>
          <p>Кількість годин сну: {hoursOfSleep}</p>
          <p>Процент: {percentage}%</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Додати ціль"
            onKeyUp={(e) => {
              if (e.key === 'Enter' && e.target.value.trim() !== '') {
                addGoal(e.target.value);
                e.target.value = '';
              }
            }}
          />
        </div>
      </div>
      <div className="goals">
        <h2>Ваші цілі</h2>
        <ul>
          {goals.map((goal, index) => (
            <li key={index}>
              {goal}
              <button onClick={() => completeGoal(index)}>Готово</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="completed-goals">
        <h2>Виконані цілі</h2>
        <ul>
          {completedGoals.map((goal, index) => (
            <li key={index}>
              {goal}
              <button onClick={() => deleteCompletedGoal(index)}>Видалити</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
