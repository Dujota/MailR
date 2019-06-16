const passport = require('passport');
/**
 * @step1 on the route, instead of defining a callback,
 * @step2 we tell the route handler to use the passport.authenticate method to handle the route response with the google strategy
 * @step3 passs an objects object , with scope array to let the strategy know what we want to access from google
 */

/**
 * @Trick_for_exporting_app
 * this is a trick to scoep out the app object in this file
 * as an exported fuction and require in the
 * index where the app is defined
 */
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  /**
   *  this is route that user returns to from the oauth flow
   * @passtportJS google strategy passed in. It knows the code property is inside the url and retreives the profile
   */
  app.get('/auth/google/callback', passport.authenticate('google'));
};
