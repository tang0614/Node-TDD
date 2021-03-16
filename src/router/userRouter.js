const User = require('../user/User');
const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

const validateUsername = (req, next) => {
    const user = req.body;
    if (user.username === null) {
        req.validationErrors = {
            username: 'Username cannot be null'
        };
    }
    next();
};

const validateEmail = (req, next) => {
    const user = req.body;
    if (user.email === null) {
        req.validationErrors = {
            ...req.validationErrors,
            email: 'E-mail cannot be null'
        };
    }
    next();
};

router.post(
    '/',
    validateUsername,
    validateEmail,
    async (req, res) => {
        if (req.validationErrors) {
            const response = {
                validationErrors: { ...req.validationErrors }
            };
            return res.status(400).send(response);
        }
        await userService.save(req.body);

        return res.send({ message: 'User created' });
    }
);
module.exports = router;
