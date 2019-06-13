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
    accessToken => window.console.log(accessToken)
  )
);

app.listen(PORT, () => {
  window.console.log(`Listending on Port: ${PORT}`);
});
