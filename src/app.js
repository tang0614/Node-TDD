const User = require('./user/User');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const userRouter = require('./router/userRouter');
//a middleware function which recognizes the incoming Request Object as a JSON Object
app.use(express.json());

app.use('/api/1.0/users', userRouter);
module.exports = app;
