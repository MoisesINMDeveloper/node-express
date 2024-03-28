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
}

module.exports = ProductsService;
