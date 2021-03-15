const app = require('./src/app');
app.listen(3000, () =>
    console.log('server is listening on 3100 successfully')
);
console.log('env:', process.env.NODE_ENV);
