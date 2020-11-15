import node_resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import hotcss from "rollup-plugin-hot-css";
import commonjs from "rollup-plugin-commonjs-alternate";
import replace from "rollup-plugin-replace";
import static_files from "rollup-plugin-static-files";
import { terser } from "rollup-plugin-terser";
import refresh from "rollup-plugin-react-refresh";
import typescript from "rollup-plugin-typescript2";

console.log(process.env.NODE_ENV);
let config = {
  input: "./src/main.tsx",
  output: {
    dir: "dist",
    format: "esm",
    entryFileNames: "[name].[hash].js",
    assetFileNames: "[name].[hash][extname]",
  },
  plugins: [
    // typescript(),
    hotcss({
      hot: process.env.NODE_ENV === "development",
      filename: "styles.css",
    }),
    babel({
      extensions: [".mjs", ".js", ".json", ".node", ".tsx", ".jsx", ".jsx"],
      exclude: "node_modules/**",
    }),
    node_resolve({
      extensions: [".mjs", ".js", ".json", ".node", ".tsx", ".jsx", ".jsx"],
    }),
    commonjs({
      define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      },
    }),
    process.env.NODE_ENV === "development" && refresh(),
  ],
};

if (process.env.NODE_ENV === "production") {
  config.plugins = config.plugins.concat([
    static_files({
      include: ["./public"],
    }),
    terser(),
  ]);
}

export default config;
