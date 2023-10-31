const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const prisma = require('./database'); // Подключение к базе данных
const notFoundMiddleware = require('./notFoundMiddleware'); // Импорт notFoundMiddleware
const errorHandlerMiddleware = require('./errorHandlerMiddleware'); // Импорт errorHandlerMiddleware

const app = express();
const port = process.env.PORT || 3001;

// Настройка сессий
app.use(
  expressSession({
    secret: 'mysecretkey', // Секретный ключ для подписи сессий
    resave: false,
    saveUninitialized: false,
  })
);

// Инициализация Passport
app.use(passport.initialize());
app.use(passport.session());

// Настройка Local Strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    // Поиск пользователя в базе данных по username
    prisma.user
      .findUnique({
        where: { username: username },
      })
      .then((user) => {
        if (!user) {
          return done(null, false); // Пользователь не найден
        }

        // Проверка пароля - здесь вы должны добавить код для сравнения пароля пользователя
        // Сравните введенный пароль с паролем пользователя в базе данных

        // Пример сравнения паролей (замените его на свой метод проверки пароля):
        if (password !== user.password) {
          return done(null, false); // Неверный пароль
        }

        return done(null, user); // Пользователь найден
      })
      .catch((err) => {
        return done(err); // Ошибка при поиске пользователя
      });
  })
);

passport.serializeUser((user, done) => {
  // Сериализация пользователя в сессии
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Десериализация пользователя из сессии
  prisma.user
    .findUnique({
      where: { id: id },
    })
    .then((user) => {
      done(null, user); // Найти пользователя по id и передать его в done
    })
    .catch((err) => {
      done(err); // Ошибка при десериализации пользователя
    });
});

// Роуты для аутентификации и авторизации
app.post('/login', passport.authenticate('local'), (req, res) => {
  // Если аутентификация успешна, перенаправить пользователя на его аккаунт
  res.redirect('/account');
});

app.get('/account', (req, res) => {
  // Защищенная страница, доступная только аутентифицированным пользователям
  res.send('Добро пожаловать в ваш аккаунт, ' + req.user.username);
});

app.get('/logout', (req, res) => {
  req.logout(); // Разлогинить пользователя
  res.redirect('/');
});

// Добавьте роуты для вашего существующего сервера

// Теперь вы можете добавить роуты для существующего сервера. Например:
app.get('/', (req, res) => {
  res.send('ZEPP-LIFE');
});

app.use(express.json());
app.use('/api', require('./routes/userRoutes'));

app.post('/api/saveWorkout', async (req, res) => {
  const { userId, workoutData } = req.body;

  try {
    await prisma.userStats.create({
      data: {
        userId: userId,
        ...workoutData,
      },
    });

    res.status(201).json({ message: 'Дані тренування успішно збережені' });
  } catch (error) {
    console.error('Виникла помилка при збереженні даних', error);
    res.status(500).json({ error: 'Виникла помилка при збереженні даних' });
  }
});

// Используйте notFoundMiddleware для обработки 404 ошибки
app.use(notFoundMiddleware);

// Используйте errorHandlerMiddleware для обработки других ошибок
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});
