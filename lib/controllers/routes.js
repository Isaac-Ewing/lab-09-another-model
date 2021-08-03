const Router = require('express');
const Soup = require('../models/Soup.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const soup = await Soup.insert(req.body);
      res.send(soup);
    }
    catch(err) {
      next(err);
    }
  });
