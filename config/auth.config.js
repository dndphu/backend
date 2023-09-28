module.exports = {
  secret: process.env.TOKEN_SECRET,
  // jwtExpiration: 3600, // 1 hour
  // jwtRefreshExpiration: 86400, // 24 hours

  /* for test */
  jwtExpiration: 10,          // 1m
  jwtRefreshExpiration: 20,  // 2 minutes
};
