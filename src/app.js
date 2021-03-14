const User = require('./user/User');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

//a middleware function which recognizes the incoming Request Object as a JSON Object
app.use(express.json());

app.listen(3000, () =>
    console.log('server is listening on 3000 successfully')
);

app.post('/api/1.0/users', (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = { ...req.body, password: hash };

        User.create(user).then(() => {
            return res.send({ message: 'User created' });
        });
    });
});
module.exports = app;
