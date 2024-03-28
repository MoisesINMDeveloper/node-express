const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
<<<<<<< HEAD
    const { error } = schema.validate(data, { abortEarly: false });
=======
    const { error } = schema.validate(data,{abortEarly: false});
>>>>>>> ebed3db7d7802dfb851b3f5c9c12d6ca12567074
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
