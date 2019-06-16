const express = require('express');
require('./services/passport');

// we declare the app object, then require the routes, and immediate invoke the auth routes exported function with the app object
const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; // heroku port || local

// SERVER IS RUNNING MSG
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
