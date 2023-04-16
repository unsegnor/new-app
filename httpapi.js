const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/helloworld', (req, res) => {
  res.send('Hello World!');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
