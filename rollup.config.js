import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const bundle = (config) => ({
  ...config,
  input: "./src/index.ts",
  external: (id) => !/^[./]/.test(id),
});

const name = "ReactLottiePlayer";

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        file: `dist/${name}.js`,
        format: "cjs",
        sourcemap: false,
        compact: true,
      },
      {
        file: `dist/${name}.mjs`,
        format: "es",
        sourcemap: false,
        compact: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `dist/${name}.d.ts`,
      format: "es",
    },
  }),
];
