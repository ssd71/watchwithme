

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('.'));

server = app.listen(port, () => {
  console.log(`WatchWithMe app listening on port ${port}!`);
});

module.exports = server;
