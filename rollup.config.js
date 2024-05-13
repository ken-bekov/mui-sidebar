import typescript from '@rollup/plugin-typescript';

export default {
    input: './src/index.ts',
    output: {
        file: './dist/bundle.min.js',
        format: 'iife',
        name: 'bundle',
    },
    plugins: [typescript()]
};
