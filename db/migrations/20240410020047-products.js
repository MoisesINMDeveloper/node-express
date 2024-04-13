'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model');
const {
  CategorySchema,
  CATEGORY_TABLE,
} = require('./../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
