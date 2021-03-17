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

const validUser = {
    username: 'user1',
    email: 'user1@gmail.com',
    password: 'P4ssword'
};

const postUser = (user = validUser) => {
    return request(app).post('/api/1.0/users').send(user);
};

describe('User registration', () => {
    it('returns 200 OK while signup request is valid', async () => {
        const response = await postUser();
        expect(response.status).toBe(200);
    });

    it('returns 200 OK while signup request is valid', async () => {
        const response = await postUser();
        expect(response.body.message).toBe('User created');
    });

    it('saves the username and email to database', async () => {
        const response = await postUser();
        const userList = await User.findAll();
        const savedUser = userList[0];
        expect(savedUser.username).toBe('user1');
        expect(savedUser.email).toBe('user1@gmail.com');
    });

    it('hashes the password in database', async () => {
        const response = await postUser();
        const userList = await User.findAll();
        const savedUser = userList[0];
        expect(savedUser.password).not.toBe('P4ssword');
    });

    it('returns 400 when username is null', async () => {
        const response = await postUser({
            username: null,
            email: 'user1@gmail.com',
            password: 'P4ssword'
        });
        expect(response.status).toBe(400);
    });
    it('returns validationErrors field in response body when validation error occurs', async () => {
        const response = await postUser({
            username: null,
            email: 'user1@gmail.com',
            password: 'P4ssword'
        });
        const body = response.body;
        expect(body.validationErrors).not.toBeUndefined();
    });

    it.each`
        field         | expectedMessage
        ${'username'} | ${'Username cannot be null'}
        ${'email'}    | ${'E-mail cannot be null'}
        ${'password'} | ${'Password cannot be null'}
    `(
        'returns $expectedMessage when $field is null',
        async ({ field, expectedMessage }) => {
            const user = {
                username: 'user1',
                email: 'user1@gmail.com',
                password: 'P4ssword'
            };
            user[field] = null;
            const response = await postUser(user);
            const body = response.body;

            expect(body.validationErrors[field]).toBe(
                expectedMessage
            );
        }
    );

    // it('returns Username cannot be null when username is null', async () => {
    //     const response = await postUser({
    //         username: null,
    //         email: 'user1@gmail.com',
    //         password: 'P4ssword'
    //     });
    //     const body = response.body;
    //     expect(body.validationErrors.username).toBe(
    //         'Username cannot be null'
    //     );
    // });

    // it('returns E-mail cannot be null when email is null', async () => {
    //     const response = await postUser({
    //         username: 'user1',
    //         email: null,
    //         password: 'P4ssword'
    //     });
    //     const body = response.body;
    //     expect(body.validationErrors.email).toBe(
    //         'E-mail cannot be null'
    //     );
    // });
    it('returns errors for both when username and email is null', async () => {
        const response = await postUser({
            username: null,
            email: null,
            password: 'P4ssword'
        });
        const body = response.body;
        // can use Object.keys here because keys are strings and they are stored in order
        expect(Object.keys(body.validationErrors)).toEqual([
            'username',
            'email'
        ]);
    });
});
