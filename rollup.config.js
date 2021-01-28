// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const libraryName = 'ripple' // Change with your library's name

const banner = `/*!
 * ${pkg.name}
 * ${pkg.description}
 *
 * @version v${pkg.version}
 * @author ${pkg.author}
 */`

export default (commandLineArgs) => {
  const configs = [
    // UMD Development
    {
      input: 'src/index.js',
      output: {
        banner,
        name: libraryName,
        file: `dist/${libraryName}.umd.js`,
        format: 'umd',
      },
      plugins: [
        babel({
          exclude: ['node_modules/**'],
        }),
      ],
    },

    // CommonJS (for Node) build
  ]

  if (commandLineArgs.environment === 'BUILD:production') {
    // UMD Production
    configs.push({
      input: 'src/index.js',
      output: {
        banner,
        name: libraryName,
        file: `dist/${libraryName}.umd.min.js`,
        format: 'umd',
      },
      plugins: [
        // Uncomment the following 2 lines if your library has external dependencies
        // resolve(), // teach Rollup how to find external modules
        // commonjs(), // so Rollup can convert external modules to an ES module

        babel({
          exclude: ['node_modules/**'],
        }),
        terser({
          output: {
            comments: /^!/,
          },
        }),
      ],
    })
    // unbabel version of UMD
    configs.push({
      input: 'src/index.js',
      output: {
        name: libraryName,
        file: `dist/${libraryName}.unbabel.min.js`,
        format: 'umd',
      },
      plugins: [
        terser({
          output: {
            comments: /^!/,
          },
        }),
      ],
    })
  }

  return configs
}
