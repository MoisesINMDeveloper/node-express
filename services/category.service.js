const pool = require('../libs/postgres.pool');

class CategoryService {
  //constructur de la clase
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  // crear categorias
  async createCategory(datas) {
    let { name, items } = datas;
    const queryId = 'SELECT (MAX(ID) + 1) AS ID FROM CATEGORIES';
    const { rows } = await this.pool.query(queryId);
    if (!items) {
      items = 0;
    }
    const values = [rows[0].id, name, items];
    const query = 'INSERT INTO CATEGOERIES (ID,NAME,ITEMS) VALUES($1, $2, $3)';
    await this.pool.query(query, values);
    return {
      id: rows[0].id,
      ...datas,
    };
  }
  // Obtener todas las categorias
  async getAll() {
    const query = 'SELECT * FROM categories';
    const categories = await this.pool.query(query);
    return categories.rows;
  }
  //Una categoria por id
  async getOne(id) {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const category = await this.pool.query(query, [id]);
    return category.rows;
  }
  // Acualizar categorias
  async updateCategory(id, dataChange) {
    const datasUpdate = [];
    const setQuery = [];
    Object.entries(dataChange).forEach((entrie, index) => {
      setQuery.push(entrie[0] + `= $${index + 1}`);
      datasUpdate.push(entrie[1]);
    });
    return {
      id,
      ...dataChange,
    };
  }
  //Eliminar categoria
  async deleteCategory(id) {
    const query = 'DELETE FROM CATEGORIES WHERE ID = $1';
    await this.pool.query(query, [id]);
    return { id };
  }
}

module.exports = CategoryService;
