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
    const postValidUser = () => {
        return request(app).post('/api/1.0/users').send({
            username: 'user1',
            email: 'user1@gmail.com',
            password: 'P4ssword'
        });
    };

    it('returns 200 OK while signup request is valid', async () => {
        const response = await postValidUser();
        expect(response.status).toBe(200);
    });

    it('returns 200 OK while signup request is valid', async () => {
        const response = await postValidUser();
        expect(response.body.message).toBe('User created');
    });

    it('saves the username and email to database', async () => {
        const response = await postValidUser();
        const userList = await User.findAll();
        const savedUser = userList[0];
        expect(savedUser.username).toBe('user1');
        expect(savedUser.email).toBe('user1@gmail.com');
    });

    it('hashes the password in database', async () => {
        const response = await postValidUser();
        const userList = await User.findAll();
        const savedUser = userList[0];
        expect(savedUser.password).not.toBe('P4ssword');
    });
});
