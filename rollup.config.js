import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");


const conf = [
    {
        input: "./index.ts",
        external(id) {

            const res = [
                "react",
                "react-dom",
                "react-is",
                "@material-ui",
                "react-window",

                "hub-lib",
                "trad-lib",
                "format-lib",
                "tools-lib",
                "adwone-engine",

                ...Object.keys(packageJson.dependencies || {}),
                ...Object.keys(packageJson.devDependencies || {}),
                ...Object.keys(packageJson.peerDependencies || {})].includes(id.split('/')[0])

            return res;
        },
        output: [
            {
                dir: "./",
                format: "cjs",
                sourcemap: true,
                preserveModules: true,
                preserveModulesRoot: './'
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
        ],
    },
    {
        input: "types/index.d.ts",
        output: [{ file: "index.d.ts", format: "esm" }],
        plugins: [dts()],
    },
];

export default conf;