const express = require('express');

// Authentication
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000; // heroku port || local

// PASSPORT MIDDLEWARE
/**  Call the new Google Oauth Instance with config option and pass it to passport
 * use(), prodivdes passport with a new strategy to handle the auth process.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: `/auth/google/callback`,
    },
    accessToken => console.log(accessToken)
  )
);

// Route Handler
app.get('/testRoute', (req, res) => {
  res.send({ hello: 'world' });
});

/**
 * @step1 on the route, instead of defining a callback,
 * @step2 we tell the route handler to use the passport.authenticate method to handle the route response with the google strategy
 * @step3 passs an objects object , with scope array to let the strategy know what we want to access from google
 */
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profil', 'email'],
  })
);

// SERVER IS RUNNING MSG
app.listen(PORT, () => {
  console.log(`Listendi ng on Port: ${PORT}`);
});
