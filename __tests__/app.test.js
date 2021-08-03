const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Soup = require('../lib/models/Soup.js');

describe('anotherOne routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('posts a new soup', async () => {
    const res = await request(app)
      .post('/api/v1/soup')
      .send({ ingredients: 'soup stuff' });

    expect(res.body).toEqual({ id: '1', ingredients: 'soup stuff' });
  });

  it('gets a soup using id', async () => {
    const soup = await Soup.insert({ id: '1', ingredients: 'soup stuff' });
    const res = await request(app)
      .get(`/api/v1/soup/${soup.id}`);

    expect(res.body).toEqual(soup);
  });

  it('gets all soups', async () => {
    const soup = await Soup.insert({
      id: '1',
      ingredients: 'soup stuff'
    });
    const moreSoup = await Soup.insert({
      id: '2',
      ingredients: 'different soup stuff'
    });
    const res = await request(app)
      .get('/api/v1/soup/');
      

    expect(res.body).toEqual([soup, moreSoup]);
  });

  it('updates soup by id using PUT', async () => {
    const soup = await Soup.insert({
      id: '1',
      ingredients: 'soup stuff'
    });
    const res = await request(app)
      .put(`/api/v1/soup/${soup.id}`)
      .send({ ingredients: 'better ingredients' });
      

    expect(res.body).toEqual({ id: '1', ingredients: 'better ingredients' });
  });

  it('destroys a log by id using DELETE', async () => {
    const soup = await Soup.insert({
      id: '1',
      ingredients: 'soup stuff'
    });
    const res = await request(app)
      .delete(`/api/v1/soup/${soup.id}`);
      
    expect(res.body).toEqual({ message: 'no soup for you' });
  });
});
