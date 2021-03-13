const express = require('express');
const app = express();
app.listen(3000, () =>
    console.log('server is listening on 3100 successfully')
);

module.exports = app;
