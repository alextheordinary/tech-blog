const queryHelpers = require('../utils/query-helpers');

const withAuth = (req, res, next) => {
    // Forces you to login page if not logged in
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };

  const signedIn = (req, res, next) => {
    // Keeps you away from login and sign up if you're already signed in
    if (req.session.logged_in) {
        res.redirect('back');
    } else {
        next();
    }
  }

  const creatorCheck = async (req, res, next) => {
    // Stops users from editing other user posts by directly typing in edit post URLs
    const postCreator = await queryHelpers.getPostCreator(req.params.id);
    const isCreator = postCreator.user_id === req.session.user_id;
    if (isCreator) {
        next();
    } else {
      res.redirect('back');
    }
  }
  
  module.exports = {withAuth, signedIn, creatorCheck};