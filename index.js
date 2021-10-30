const express = require('express');

const app = express();
const port = 7000;

app.get('/', (req, res) => {
  res.send('running assignment-11 server');
});

app.listen(port, () => {
  console.log('running assignment-11 on port', port);
});
