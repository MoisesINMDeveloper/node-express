<<<<<<< HEAD
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class ProductsService {
  constructor() {
    this.products = [];
  }

  async create(data) {
    const { name, price, image } = data;
    const isBlock = false; // Aquí puedes establecer el valor que quieras para isBlock
    const query =
      'INSERT INTO public.products (NAME, PRICE, IMAGE, ISBLOCK) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, price, image, isBlock];
    const { rows } = await this.pool.query(query, values);
    return rows[0];
  }

  async find() {
    const query = 'SELECT * FROM public.products';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM public.products WHERE ID = $1';
    const { rows } = await this.pool.query(query, [id]);
    if (rows.length === 0) {
      throw boom.notFound('Product not found');
    }
    return rows[0];
  }

  async update(id, changes) {
    const keys = Object.keys(changes);
    const values = Object.values(changes);
    const setQuery = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    const query = `UPDATE public.products SET ${setQuery} WHERE ID = $1 RETURNING *`;
    const { rows } = await this.pool.query(query, [id, ...values]);
    if (rows.length === 0) {
      throw boom.notFound('Product not found');
    }
    return rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM public.products WHERE ID = $1 RETURNING *';
    const { rows } = await this.pool.query(query, [id]);
    if (rows.length === 0) {
      throw boom.notFound('Product not found');
    }
    return rows[0];
  }
=======
const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

>>>>>>> ebed3db7d7802dfb851b3f5c9c12d6ca12567074
}

module.exports = ProductsService;
