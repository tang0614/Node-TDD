module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint', // This line is required to fix "unexpected token" errors
    rules: {
        indent: ['warn', 4]
    },
    env: {
        node: true,
        es6: true,
        jest: true
    }
};
