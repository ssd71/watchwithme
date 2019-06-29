


const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.use(express.static('.'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
