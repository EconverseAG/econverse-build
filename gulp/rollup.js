import { dest } from 'gulp';
import rollup from '@rollup/stream';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import gulp_uglify from 'gulp-uglify';
import gulp_rename from 'gulp-rename';
import rollup_commonjs from '@rollup/plugin-commonjs';
import rollup_json from '@rollup/plugin-json';
import rollup_resolve from '@rollup/plugin-node-resolve';
import rollup_babel from '@rollup/plugin-babel';
import rollup_replace from '@rollup/plugin-replace';
import rollup_strip from '@rollup/plugin-strip';
import rollup_postcss from 'rollup-plugin-postcss';
import rollup_cleanup from 'rollup-plugin-cleanup';
import rollup_typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import * as Utils from '../gulp/utils';

// Check for --production flag
const isProduction = Utils.isProduction();

// Babel Configs
const Babel = {
  ...Utils.getBabelRC(),
  compact: false,
  sourceMaps: false,
  babelHelpers: 'runtime'
};

// Resolve Configs
const Resolve = {
  browser: true,
  extensions: ['.ts', '.js', '.json'],
  customResolveOptions: { moduleDirectories: ['src'] }
};

// Replace Configs
const Replace = {
  preventAssignment: true,
  'process.env.NODE_ENV': isProduction ?
    JSON.stringify('production') : JSON.stringify('development')
};

// Uglify Configs
const Uglify = {
  sourceMap: false,
  mangle: { toplevel: false },
  compress: { negate_iife: false }
};

// Cleanup Configs
const Cleanup = {
  sourcemap: false,
  comments: 'none'
};

// Strip Configs
const Strip = {
  debugger: true,
  sourceMap: false,
  labels: ['unittest'],
  functions: [ 'console.log', 'assert.*', 'debug' ]
};

// PostCSS Configs
const PostCSS = [
  true && autoprefixer(),
  isProduction && cssnano()
].filter( Boolean );

// Bundle file with Rollup
export const Bundle = file => {

  const path = file.path;
  const fileName = file.basename;
  const distPath = file.dirname.replace('src', 'dist');
  const isTypeScript = file.extname === '.ts';

  const options = { 
    input: path,
    output: {
      sourcemap: false,
      name: fileName,
      format: 'umd',
      strict: false
    },
    plugins: [
      isTypeScript && rollup_typescript(),
      true && rollup_commonjs(),
      true && rollup_json(),
      true && rollup_postcss({ plugins: PostCSS }),
      true && rollup_resolve( Resolve ),
      true && rollup_babel( Babel ),
      true && rollup_replace( Replace ),
      isProduction && rollup_strip( Strip ),
      isProduction && rollup_cleanup( Cleanup )
    ].filter( Boolean ),
    onwarn: warning => (
      // Ignore warnings
      warning.code === 'EMPTY_BUNDLE' ||
      warning.code === 'THIS_IS_UNDEFINED' || 
      warning.code === 'CIRCULAR_DEPENDENCY'
    ) ? null : Utils.logError(`[${warning.code}] ${warning.message}`)
  };

  // Default Rollup pipes
  let Stream = rollup(options).pipe(source(fileName)).pipe(buffer());

  if ( isProduction ) {
    // Add production plugins here...
    Stream = Stream.pipe(gulp_uglify( Uglify ));
  }

  // Dest pipe
  Stream = Stream
    .pipe(gulp_rename(file => file.extname = file.extname.replace('ts', 'js') ))
    .pipe(dest(distPath));

  return Stream;
};