const User = require('../user/User');
const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const { check, validationResult } = require('express-validator');

// const validateUsername = (req, next) => {
//     const user = req.body;
//     if (user.username === null) {
//         req.validationErrors = {
//             username: 'Username cannot be null'
//         };
//     }
//     next();
// };

// const validateEmail = (req, next) => {
//     const user = req.body;
//     if (user.email === null) {
//         req.validationErrors = {
//             ...req.validationErrors,
//             email: 'E-mail cannot be null'
//         };
//     }
//     next();
// };

router.post(
    '/',
    check('username')
        .notEmpty()
        .withMessage('Username cannot be null')
        .bail()
        .isLength({ min: 4, max: 32 })
        .withMessage('Must have min 4 and max 32 characters'),
    check('email')
        .notEmpty()
        .withMessage('E-mail cannot be null')
        .bail()
        .isEmail()
        .withMessage('E-mail is not valid')
        .bail()
        .custom(async (email) => {
            const user = await userService.findByEmail(email);
            if (user) {
                throw new Error('E-mail in use');
            }
        }),
    check('password')
        .notEmpty()
        .withMessage('Password cannot be null')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
        .withMessage(
            'Password must have at least 1 uppercase, 1 lowercase letter and 1 number'
        ),
    async (req, res) => {
        const returned_errors = validationResult(req);
        if (!returned_errors.isEmpty()) {
            const validationErrors = {};
            returned_errors.errors.forEach(
                (error) => (validationErrors[error.param] = error.msg)
            );
            return res
                .status(400)
                .send({ validationErrors: validationErrors });
        }
        await userService.save(req.body);
        return res.send({ message: 'User created' });
    }
);
module.exports = router;
