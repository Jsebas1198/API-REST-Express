//captures the error
function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.log(err);
  next(err);
}

//sends the error to the client
//even if next is not used, it should  be in the parameter of the function so
//it detects  that is an error middleware
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

// eslint-disable-next-line no-unused-vars
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}
module.exports = { logErrors, errorHandler, boomErrorHandler };
