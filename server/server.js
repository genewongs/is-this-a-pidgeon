const express = require('express');
const db = require('./db.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

app.get('/api/tests', (req, res) => {
  db.getAll()
    .then(data => res.send(data))
    .catch(err => res.sendStatus(500))
});

app.post('/api/tests', (req,res) => {
  let data = req.body;
  console.log(data)
  db.save(data)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500));
});

app.patch('/api/tests/name', (req,res) => {
  let data = req.body;
  db.updateName(data)
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

app.patch('/api/tests/status', (req,res) => {
  let data = req.body;
  console.log('patch', data)
  db.updateStatus(data)
  .then(result => res.send(result))
  .catch(err => console.log(err));
});

app.patch('/api/tests/like', (req,res) => {
  let data = req.body;
  db.updateLike(data)
  .then(result => res.send(result))
  .catch(err => console.log(err));
});

app.delete('/api/tests', (req,res) => {
  let data = req.body;
  db.deleteBird(data)
    .then(result => res.send(result))
    .catch(err => console.log(err));
})