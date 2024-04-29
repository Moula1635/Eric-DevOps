const request = require('supertest');
const server = require('../server');

describe('GET /', () => {

    it('responds with text "Hello, World!"', async () => {
        const response = await request(server).get('/');
        expect(response.text).toContain('<title>Dynamic Button Surprise</title>');
        expect(response.text).toContain('Click me for a surprise!');
    });
    

    it('responds with status code 200', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    });
});

describe('GET /invalid-route', () => {
    it('responds with status code 404', async () => {
        const response = await request(server).get('/invalid-route');
        expect(response.status).toBe(404);
    });

    it('responds with HTML error page', async () => {
        const response = await request(server).get('/invalid-route');
        expect(response.text).toContain('<title>Error</title>');
        expect(response.text).toContain('Cannot GET /invalid-route');
    });
});

describe('POST /', () => {
    it('responds with status code 405', async () => {
      const response = await request(server).post('/');
      expect(response.status).toBe(405);
    });
  
    it('responds with text "Method Not Allowed"', async () => {
      const response = await request(server).post('/');
      expect(response.text).toBe('Method Not Allowed');
    });
  });
  
