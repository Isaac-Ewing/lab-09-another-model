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
};
