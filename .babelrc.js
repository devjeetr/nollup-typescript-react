const createTildifyConfig = (dir) => ({
  "@libz": `./${dir}/@libz`,
});

const TILDIFY_CONFIG = createTildifyConfig("src");

module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    [
      "@babel/plugin-transform-typescript",
      { isTSX: true, allExtensions: true },
    ],
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"],
        alias: TILDIFY_CONFIG,
      },
    ],
  ],
  env: {
    development: {
      plugins: ["react-refresh/babel"],
    },
  },
};
