const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const graphql = require('./routes/graphql');
const User = require('./models/user');
const withAuth = require('./middleware');

const app = express();
// For testing purposes. This should go in env file
const secret = 'mysecretsshhh';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/register', withAuth, (req, res) => {
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

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
            error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.use('/graphql', graphql);

module.exports = app;
