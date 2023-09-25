

  function requestLogger(req, res, next) {
    console.log(`Request received at ${new Date()}`);
    next(); // Call next to pass control to the next middleware or route handler
  }
  
  module.exports = requestLogger; 