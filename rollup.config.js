import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import image from 'rollup-plugin-image';
import globals from 'rollup-plugin-node-globals';
import pkg from './package.json';

const ENV = process ? process.env.NODE_ENV : JSON.stringify('development');
const isProduction = ENV === 'production';
const isDevelopment = ENV === 'development';

export default [
    {
        input: 'src/index.js',
        external: ['react', 'react-dom'],
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        },
        output: [
            {name: 'ReactBoardGameComponents', file: pkg.browser, format: 'umd'}, // browser-friendly UMD build
            {file: pkg.main, format: 'cjs' }, // CommonJS (for Node)
            {file: pkg.module, format: 'es' }, // ES module (for bundlers and modern browsers)
        ],
        plugins: [
			/*eslint({
				exclude: '*.css',
				envs: ["browser"]
			}),*/
			postcss({
				extensions: ['.css'],
			}),
			babel({
				exclude: ['node_modules/**'],
				plugins: ['external-helpers']
			}),
			resolve(), // Makes it possible to load third-party modules in node_modules.
			commonjs(), // Converts CommonJS modules to ES6.
			image(), // For importing JPG, PNG, GIF and SVG images
			globals(), // Injects the same node globals browserify does (i.e process, Buffer, etc)    
			isProduction && uglify()
        ],
        sourcemap: true
    }
];