const User = require('../user/User');
const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
router.post('/', async (req, res) => {
    await userService.save(req.body);

    return res.send({ message: 'User created' });
});
module.exports = router;
