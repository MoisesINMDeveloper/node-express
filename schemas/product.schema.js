const Joi = require('joi');

<<<<<<< HEAD
const id = Joi.number();
=======
const id = Joi.string().uuid();
>>>>>>> ebed3db7d7802dfb851b3f5c9c12d6ca12567074
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
