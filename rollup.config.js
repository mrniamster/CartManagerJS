import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
export default {
    input: `src/index.js`,
    output: {
        name:"cartmanager",
        file: `index.js`,
        format:'iife',
    },
    plugins: [
        resolve(),
        commonjs(),
        terser(),
    ]
}