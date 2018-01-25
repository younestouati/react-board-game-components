import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import image from 'rollup-plugin-image';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		external: ['react', 'react-dom'],
		input: 'src/index.js',
		output: {
			name: 'react-board-game-components',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			babel({
				exclude: ['node_modules/**'],
				plugins: ['external-helpers']
			}),
			resolve(),
			commonjs(),
			image()
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		external: ['react', 'react-dom', 'prop-types'],
		output: [
			{ dest: pkg.main, format: 'cjs' },
			{ dest: pkg.module, format: 'es' }
		],
		plugins: [
			babel({
				exclude: ['node_modules/**'],
				plugins: ['external-helpers']
			}),
			image()
		]
	}
];
