const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('ZEPP-LIFE');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});