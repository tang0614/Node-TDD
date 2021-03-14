const User = require('./user/User');
const express = require('express');
const app = express();
app.use(express.json());

app.listen(3000, () =>
    console.log('server is listening on 3000 successfully')
);

app.post('/api/1.0/users', (req, res) => {
    User.create(req.body).then(() => {
        return res.send({ message: 'User created' });
    });
});
module.exports = app;
