module.exports = {
  extends: ['next/core-web-vitals', '@bitcoin24/config/eslint'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  }
};
