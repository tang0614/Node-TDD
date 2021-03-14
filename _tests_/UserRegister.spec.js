const app = require('../src/app');
const request = require('supertest');

describe('User registration', () => {
    it('returns 200 OK while signup request is valid', (done) => {
        request(app)
            .post('/api/1.0/users')
            .send({
                userName: 'user1',
                email: 'user1@gmail.com',
                password: 'password'
            })
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            });
    });

    it('returns 200 OK while signup request is valid', (done) => {
        request(app)
            .post('/api/1.0/users')
            .send({
                userName: 'user1',
                email: 'user1@gmail.com',
                password: 'password'
            })
            .then((response) => {
                expect(response.body.message).toBe('User created');
                done();
            });
    });
});
