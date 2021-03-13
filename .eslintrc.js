module.exports = {
    parserOptions: {
        ecmaVersion: 6
    },
    extends: ['eslint:recommended'],
    env: {
        node: true,
        es6: true,
        jest: true
    },
    rules: {
        semi: 'warn',
        quotes: ['warn', 'single']
    }
};
