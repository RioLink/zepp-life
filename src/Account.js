import React, { useState } from 'react';
import './Account.css';
import axios from 'axios';

function Account() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', loginData);

      if (response.data.success) {

        console.log('Вход выполнен успешно');

      } else {

        console.error('Ошибка входа');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных для входа', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      alert('Заполните все поля');
      return;
    }

    if (!validateEmail(registerData.email)) {
      alert('Неверный формат почты');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      const response = await axios.post('/api/register', registerData);
      if (response.data.success) {
        console.log('Регистрация выполнена успешно');
      } else {
        console.error('Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных для регистрации', error);
    }
  }
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === 'login' ? 'active-button' : 'inactive-button'}
          onClick={() => setActiveTab('login')}
        >
          Вход
        </button>
        <button
          className={activeTab === 'register' ? 'active-button' : 'inactive-button'}
          onClick={() => setActiveTab('register')}
        >
          Регистрация
        </button>
      </div>

      {activeTab === 'login' && (
        <div>
          <h2>Вход</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Имя пользователя"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Пароль"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <button type="submit">Войти</button>
          </form>
        </div>
      )}

      {activeTab === 'register' && (
        <div>
          <h2>Регистрация</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Имя пользователя"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Пароль"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Подтвердите пароль"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button type="submit">Зарегистрироваться</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Account;
