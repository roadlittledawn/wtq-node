const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const graphql = require('./routes/graphql');
const User = require('./models/user');

const app = express();
// For testing purposes. This should go in env file
const secret = 'mysecretsshhh';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save((err) => {
    if (err) {
      res.status(500)
        .send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

app.use('/graphql', graphql);

module.exports = app;
