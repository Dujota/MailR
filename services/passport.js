const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Set up the connection to mongo and the diretly access the User through mongoose, DO NOT require the user model file
const User = mongoose.model('users');

/**
 * @PASSPORT @MIDDLEWARE
 *   Call the new Google Oauth Instance with config option and pass it to passport
 * use(), prodivdes passport with a new strategy to handle the auth process.
 */

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: `/auth/google/callback`,
    }, // this callback is fired when /auth/google/callback finishes (passportJS exchanges code for api data)
    (accessToken, refreshToken, profile, done) => {
      const { id: googleId } = profile;
      // Query DB for the user coming for Google-OAtuh
      User.findOne({ googleId }).then(existingUser => {
        if (existingUser) {
          console.log('user exists!!!');
          return;
          // already have a record with a given profile id
        }
        // we dont have a user in the db, make a new record
        return new User({ googleId }).save();
      });
    }
  )
);
