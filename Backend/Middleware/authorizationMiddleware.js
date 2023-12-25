module.exports= function authorizationMiddleware(roles) {
  return (req, res, next) => {
    const userRole = req.User.userType;
    if (!roles.includes(userRole))
      return res.status(403).json("unauthorized access");
    next();
  };
}

