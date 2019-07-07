const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { mongoURI, cookieKey } = require('./config/keys');
require('./models/User'); // make sure that the user model is defined before you use them in another file
require('./services/passport');

// Connecting Mongoose to App on Bootup
mongoose.connect(mongoURI, { useNewUrlParser: true });

// we declare the app object, then require the routes, and immediate invoke the auth routes exported function with the app object
const app = express();

// Cookies middleware, max age in miliseconds
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);

// Then initialize passport and use its session tracker
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; // heroku port || local

// SERVER IS RUNNING MSG
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
