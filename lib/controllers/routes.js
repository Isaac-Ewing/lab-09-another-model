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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const list = await Soup.getById(id);

      res.send(list);
    }
    catch(err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const lists = await Soup.getAll();

      res.send(lists);
    }
    catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { ingredients } = req.body;

      const newSoup = await Soup.updateById(id, { ingredients });
      res.send(newSoup);
    }
    catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const soup = await Soup.deleteById(id);
      if(soup) {
        res.send({ message: 'no soup for you' });
      }
    }
    catch(err) {
      next(err);
    }
  });
