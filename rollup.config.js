import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [{
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
            name: 'react-lib'
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        external(),
        resolve(),
        commonjs(),
    ]
},
    {
        input: 'src/index.ts',
        output: [{ file: packageJson.typings, format: "esm" }],
        external: [/\.css$/],
        plugins: [dts()],
    }
]