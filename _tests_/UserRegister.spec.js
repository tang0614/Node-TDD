const app = require('../app');
const request = require('supertest');

it('returns 200 OK while signup request is valid', () => {
    request(app)
        .post('/api/1.0/users')
        .send({
            userName: 'user1',
            email: 'user1@gmail.com',
            password: 'password',
        })
        .expect(200);
});
