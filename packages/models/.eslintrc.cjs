module.exports = {
  extends: ['@bitcoin24/config/eslint'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  }
};
