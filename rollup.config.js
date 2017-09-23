import pkg from './package.json';
import babel from 'rollup-plugin-babel';

export default [
  {
    entry: 'src/index.js',
    targets: [
      { dest: pkg.browser, format: 'umd', moduleName: 'react-lay-z-image' },
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**']
      })
    ]
  }
];
