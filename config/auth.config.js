module.exports = {
  secret: process.env.TOKEN_SECRET,
  // jwtExpiration: 3600, // 1 hour
  // jwtRefreshExpiration: 86400, // 24 hours

  /* for test */
  jwtExpiration: 60,          // 1m
  jwtRefreshExpiration: 120,  // 2 minutes
};
