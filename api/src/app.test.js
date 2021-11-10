
const { expect } = require('chai');
const request = require('supertest');
const app = require('./app');

describe('Todos API', () => {
    it('GET /todos --> array todos', () => {
        return request(app)
        .get('/todos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(
                expect.arrayContaining ([
             expect.objectContaining({
                 name: expect.any(String),
                 completed: expect.any(Boolean),
             }),
           ])
          );
        })

    });

    it('GET /todos/id --> specific todo by ID', () => {
        return request(app)
        .get('/todos/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(    
             expect.objectContaining({
                 name: expect.any(String),
                 completed: expect.any(Boolean),
             }),
           )
          
        })
    });

    it('GET /todos/id --> 404 if not found', () => {});

    it('POST /todos --> created todo', () => {});

    it('GET /todos -- validates request body', () => {});
})