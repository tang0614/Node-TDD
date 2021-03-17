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
        field         | value              | expectedMessage
        ${'username'} | ${null}            | ${'Username cannot be null'}
        ${'username'} | ${'usr'}           | ${'Must have min 4 and max 32 characters'}
        ${'username'} | ${'a'.repeat(33)}  | ${'Must have min 4 and max 32 characters'}
        ${'email'}    | ${null}            | ${'E-mail cannot be null'}
        ${'email'}    | ${'mail.com'}      | ${'E-mail is not valid'}
        ${'email'}    | ${'user.mail.com'} | ${'E-mail is not valid'}
        ${'email'}    | ${'user@mail'}     | ${'E-mail is not valid'}
        ${'password'} | ${null}            | ${'Password cannot be null'}
        ${'password'} | ${'P4ssw'}         | ${'Password must be at least 6 characters'}
        ${'password'} | ${'alllowercase'}  | ${'Password must have at least 1 uppercase, 1 lowercase letter and 1 number'}
        ${'password'} | ${'ALLUPPERCASE'}  | ${'Password must have at least 1 uppercase, 1 lowercase letter and 1 number'}
        ${'password'} | ${'1234567890'}    | ${'Password must have at least 1 uppercase, 1 lowercase letter and 1 number'}
        ${'password'} | ${'lowerandUPPER'} | ${'Password must have at least 1 uppercase, 1 lowercase letter and 1 number'}
        ${'password'} | ${'lower4nd5667'}  | ${'Password must have at least 1 uppercase, 1 lowercase letter and 1 number'}
        ${'password'} | ${'UPPER44444'}    | ${'Password must have at least 1 uppercase, 1 lowercase letter and 1 number'}
    `(
        'returns $expectedMessage when $field is $value',
        async ({ field, expectedMessage, value }) => {
            const user = {
                username: 'user1',
                email: 'user1@gmail.com',
                password: 'P4ssword'
            };
            user[field] = value;
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
