const boom = require('@hapi/boom');
//this is a normal middleware so it doesnt have the error parameter
//we use js clousures
function validatorHandler(schema, property) {
  return (req, res, next) => {
    //if data is pos => req.body
    //if data is get => req.query or req.params
    //the data is dinamic thats the reason we send it like this
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error.details[0].message));
    }
    next();
  };
}

module.exports = validatorHandler;
