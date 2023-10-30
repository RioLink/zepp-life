const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const db = require('./database');

app.get('/', (req, res) => {
  res.send('ZEPP-LIFE');
});

app.use(express.json());
app.use('/api', require('./routes/userRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
