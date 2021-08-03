const pool = require('../utils/pool');

module.exports = class Soup {
    id;
    ingredients;

    constructor(row) {
      this.id = row.id;
      this.ingredients = row.ingredients;
    }

    static async insert({ ingredients }) {
      const { rows } = await pool.query('INSERT INTO soup (ingredients) VALUES ($1) RETURNING *', [ingredients]);

      return new Soup(rows[0]);
    }

    static async getById(id) {
      const { rows } = await pool.query('SELECT * FROM soup WHERE id=$1', [id]);

      return new Soup(rows[0]);
    }

    static async getAll() {
      const { rows } = await pool.query('SELECT * FROM soup');

      return rows.map((row) => new Soup(row));
    }

    static async updateById(id, { ingredients }) {
      const currentSoup = await Soup.getById(id);
      const newList = ingredients ?? currentSoup.ingredients;
      
      const { rows } = await pool.query('UPDATE soup SET ingredients=$1 WHERE id=$2 RETURNING *', [newList, id]);
          
      return (rows[0]);
    }

    static async deleteById(id) {
      const { rows } = await pool.query('DELETE FROM soup WHERE id=$1 RETURNING *', [id]);

      return new Soup(rows[0]);
    }
};
