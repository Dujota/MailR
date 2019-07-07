const express = require('express');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys');
require('./models/User'); // make sure that the user model is defined before you use them in another file
require('./services/passport');

// Connecting Mongoose to App on Bootup
mongoose.connect(mongoURI, { useNewUrlParser: true }).catch(err => console.log(err));

// we declare the app object, then require the routes, and immediate invoke the auth routes exported function with the app object
const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; // heroku port || local

// SERVER IS RUNNING MSG
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
