import { builtinModules } from 'module';

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

import { emitModulePackageFile } from '../shared/rollup.config';

import pkg from '../packages/pluginutils/package.json';

export default {
  input: 'src/index.ts',
  plugins: [
    resolve(),
    commonjs(),
    typescript({ include: '**/*.{ts,js}', module: 'esnext' })
  ],
  external: [...builtinModules, 'picomatch'],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
    { file: pkg.module, format: 'es', plugins: [emitModulePackageFile()] }
  ]
};
