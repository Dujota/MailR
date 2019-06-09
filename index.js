const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
/**  Call the new Google Oauth Instance with config option and pass it to passport
 * use(), prodivdes passport with a new strategy to handle the auth process.
 */
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
