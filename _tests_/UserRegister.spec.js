const app = require('../src/app');
const request = require('supertest');
const User = require('../src/user/User');
const db = require('../src/config/db');

beforeAll(() => {
    db.sync();
});

beforeEach(() => {
    User.destroy({ truncate: true });
});

describe('User registration', () => {
    it('returns 200 OK while signup request is valid', (done) => {
        request(app)
            .post('/api/1.0/users')
            .send({
                username: 'user1',
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
                username: 'user1',
                email: 'user1@gmail.com',
                password: 'password'
            })
            .then((response) => {
                expect(response.body.message).toBe('User created');
                done();
            });
    });

    it('saves the username and email to database', (done) => {
        request(app)
            .post('/api/1.0/users')
            .send({
                username: 'user1',
                email: 'user1@gmail.com',
                password: 'password'
            })
            .then(() => {
                User.findAll().then((userList) => {
                    const savedUser = userList[0];
                    expect(savedUser.username).toBe('user1');
                    expect(savedUser.email).toBe('user1@gmail.com');
                    done();
                });
            });
    });

    it('hashes the password in database', (done) => {
        request(app)
            .post('/api/1.0/users')
            .send({
                username: 'user1',
                email: 'user1@mail.com',
                password: 'P4ssword'
            })
            .then(() => {
                User.findAll().then((userList) => {
                    const savedUser = userList[0];
                    expect(savedUser.password).not.toBe('P4ssword');
                    done();
                });
            });
    });
});
