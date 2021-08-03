const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('anotherOne routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('I dont know what my model is doing, but im making a failing test', async () => {
    const res = await request(app)
      .post('/api/v1/soup')
      .send({ ingredients: 'soup stuff' });

    expect(res.body).toEqual({ id: '1', ingredients: 'soup stuff' });
  });
});
