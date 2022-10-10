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
  
  module.exports = {withAuth, signedIn};