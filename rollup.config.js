// rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { preserveDirectives } from "rollup-plugin-preserve-directives";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

const outputOptions = {
  exports: 'named',
  preserveModules: true,
  interop: 'auto',
  banner: `
    /* Theo Bessel */
    'use client';
  `,
};

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        ...outputOptions
      },
      {
        dir: "dist/esm",
        format: "esm",
        ...outputOptions
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
      }),
      preserveDirectives(),
      terser(),
    ],
    external: ['react', 'react-dom', 'react-router-dom'], // Add other peer dependencies
    onwarn(warning, warn) {
      if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
        warn(warning);
      }
    },
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()]
  }
];

export default config;