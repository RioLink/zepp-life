const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const db = require('./database');

app.get('/', (req, res) => {
  res.send('ZEPP-LIFE');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
