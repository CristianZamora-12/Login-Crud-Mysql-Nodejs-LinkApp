module.exports = {
  isLoggedIn(req, resp, next){
    if(req.isAuthenticated()){
      return next();
    }
    return resp.redirect('/signin');
  },

  isNotLoggedIn(req, resp, next) {
    if(!req.isAuthenticated()){
      return next();
    }
    return resp.redirect('/profile');
  }
};
