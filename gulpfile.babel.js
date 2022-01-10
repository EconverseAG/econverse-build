/**
 * Econverse Store Build
 * https://econverse.digital/
 * Author: Vitor Seles <vitor.seles@econverse.com.br>
 * Repository / Docs: <https://github.com/vseles/econverse-build>
*/

// Import Modules;
import fs from 'fs';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import node_sass from 'node-sass';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import plumber from 'gulp-plumber';
import gulp_postcss from 'gulp-postcss';
import gulp_eslint from 'gulp-eslint';
import gulp_uglify from 'gulp-uglify';
import gulp_imagemin from 'gulp-imagemin';
import gulp_rollup from 'gulp-better-rollup';
import rollup_commonjs from '@rollup/plugin-commonjs';
import rollup_json from '@rollup/plugin-json';
import rollup_resolve from '@rollup/plugin-node-resolve';
import rollup_babel from '@rollup/plugin-babel';
import rollup_strip from '@rollup/plugin-strip';
import rollup_replace from '@rollup/plugin-replace';
import rollup_postcss from 'rollup-plugin-postcss';
import rollup_cleanup from 'rollup-plugin-cleanup';
import { src, dest, series, watch } from 'gulp';

// Set SASS Compiler;
sass.compiler = node_sass;

// Production Flag;
const isProduction = Boolean( ~process.argv.indexOf('--production') );

// BABELRC File;
const BABELRC = JSON.parse( fs.readFileSync('.babelrc') );

// Log File Update;
const LogUpdate = function (filePath) {
  const colors = `\x1b[32m`;
  const reset = `\x1b[0m`;
  return console.log(`[${`\x1b[2m`}${new Date().toLocaleTimeString()}${`\x1b[0m`}] ${colors}File "${filePath}" updated.${reset}`);
};

// Log Error
const LogError = function ( errorMessage ) {
  const colors = `\x1b[31m`;
  const reset = `\x1b[0m`;
  return console.log(`[${`\x1b[2m`}${new Date().toLocaleTimeString()}${`\x1b[0m`}] ${colors}${errorMessage}${reset}`);
};

// Get a File Parent Path;
const GetParentPath = function (filePath) {
  const splits = filePath.split('\\');
  const parentPath = `${splits[0]}\\${splits[1]}\\${splits[2]}\\${splits[3]}`;
  return parentPath;
};

// Declare Global Builder Object;
const Builder = {};

// Declare Global Builder Paths;
Builder.paths = {
  dist: './dist',
  assets: {
    common: {
      js: './src/assets/common/js',
      scss: './src/assets/common/scss',
      images: './src/assets/common/images'
    },
    desktop: {
      js: './src/assets/desktop/js',
      scss: './src/assets/desktop/scss'
    },
    mobile: {
      js: './src/assets/mobile/js',
      scss: './src/assets/mobile/scss'
    },
    responsive: {
      js: './src/assets/responsive/js',
      scss: './src/assets/responsive/scss'
    }
  }
};

// Declare Global Builder Globs;
Builder.globs = {
  assets: {
    common: {
      build: {
        js: ['./src/assets/common/js/*.js'],
        scss: ['./src/assets/common/scss/*.scss'],
        images: ['./src/assets/common/images/*'],
        js_modules: ['./src/assets/common/js/**/*.js', '!./src/assets/common/js/*.js'],
        scss_modules: ['./src/assets/common/scss/**/*.scss', '!./src/assets/common/scss/*.scss'],
      },
      linters: {
        js: ['./src/assets/common/js/*.js', './src/assets/common/js/**/*.js'],
        scss: ['./src/assets/common/scss/*.scss', './src/assets/common/scss/**/*.scss']
      },
    },
    desktop: {
      build: {
        js: ['./src/assets/desktop/js/*.js'],
        scss: ['./src/assets/desktop/scss/*.scss'],
        js_modules: ['./src/assets/desktop/js/**/*.js', '!./src/assets/desktop/js/*.js'],
        scss_modules: ['./src/assets/desktop/scss/**/*.scss', '!./src/assets/desktop/scss/*.scss'],
      },
      linters: {
        js: ['./src/assets/desktop/js/*.js', './src/assets/desktop/js/**/*.js'],
        scss: ['./src/assets/desktop/scss/*.scss', './src/assets/desktop/scss/**/*.scss']
      }
    },
    mobile: {
      build: {
        js: ['./src/assets/mobile/js/*.js'],
        scss: ['./src/assets/mobile/scss/*.scss'],
        js_modules: ['./src/assets/mobile/js/**/*.js', '!./src/assets/mobile/js/*.js'],
        scss_modules: ['./src/assets/mobile/scss/**/*.scss', '!./src/assets/mobile/scss/*.scss'],
      },
      linters: {
        js: ['./src/assets/mobile/js/*.js', './src/assets/mobile/js/**/*.js'],
        scss: ['./src/assets/mobile/scss/*.scss', './src/assets/mobile/scss/**/*.scss']
      }
    },
    responsive: {
      build: {
        js: ['./src/assets/responsive/js/*.js'],
        scss: ['./src/assets/responsive/scss/*.scss'],
        js_modules: ['./src/assets/responsive/js/**/*.js', '!./src/assets/responsive/js/*.js'],
        scss_modules: ['./src/assets/responsive/scss/**/*.scss', '!./src/assets/responsive/scss/*.scss'],
      },
      linters: {
        js: ['./src/assets/responsive/js/*.js', './src/assets/responsive/js/**/*.js'],
        scss: ['./src/assets/responsive/scss/*.scss', './src/assets/responsive/scss/**/*.scss']
      }
    }
  }
};

// Babel Config;
const Babel = {
  ...BABELRC,
  compact: false,
  sourceMaps: false,
  babelHelpers: 'runtime'
};

// Resolve Config;
const Resolve = {
  browser: true,
  extensions: ['.js', '.json'],
  customResolveOptions: { moduleDirectories: ['src'] }
};

// Replace Config;
const Replace = {
  preventAssignment: true,
  'process.env.NODE_ENV': isProduction ?
    JSON.stringify('production') : JSON.stringify('development')
};

// Uglify Config;
const Uglify = {
  sourceMap: false,
  mangle: { toplevel: false },
  compress: { negate_iife: false }
};

// Cleanup Config;
const Cleanup = {
  sourcemap: false,
  comments: 'none'
};

// Strip Config;
const Strip = {
  debugger: true,
  sourceMap: false,
  labels: ['unittest'],
  functions: [ 'console.log', 'assert.*', 'debug' ]
};

// PostCSS Config;
const PostCSS = [
  true && autoprefixer(),
  isProduction && cssnano()
].filter( Boolean );

// Rollup Config;
const Rollup = {
  plugins: [ 
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
    warning.code === 'THIS_IS_UNDEFINED'
  ) ? null : LogError(`[${warning.code}] ${warning.message}`)
};

// Gulp Task Pipes;
const Pipes = {
  eslint: function (source) {
    return source
      .pipe(plumber())
      .pipe(gulp_eslint({ useEslintrc: true }))
      .pipe(gulp_eslint.format())
      .pipe(gulp_eslint.failAfterError());
  },

  scripts: function (source) {
    
    if ( isProduction ) {

      return source
        .pipe(plumber())
        .pipe(gulp_rollup( Rollup, { format: 'cjs' }))
        .pipe(gulp_uglify( Uglify ))
        .pipe(dest(Builder.paths.dist))
    
    } else {
  
      return source
        .pipe(plumber())
        .pipe(gulp_rollup( Rollup, { format: 'cjs' }))
        .pipe(dest(Builder.paths.dist))
    }
  },

  styles: function (source) {
    return source.pipe(plumber())
      .pipe(sass().on('error', sass.logError ))
      .pipe(gulp_postcss( PostCSS ))
      .pipe(rename(file => file.dirname = file.dirname.replace('scss', 'css') ))
      .pipe(dest(Builder.paths.dist))
  },

  images: function (source) {

    return source.pipe(gulp_imagemin({ silent: true }))
      .pipe(dest(Builder.paths.dist));
  },

  js_changed: function (source, filePath) {

    if ( isProduction ) {

      return source
        .pipe(plumber())
        .pipe(gulp_eslint({ useEslintrc: true }))
        .pipe(gulp_eslint.format())
        .pipe(gulp_eslint.failAfterError())
        .pipe(gulp_rollup( Rollup, { format: 'cjs' }))
        .pipe(gulp_uglify( Uglify ))
        .pipe(dest(Builder.paths.dist).on('end', () => LogUpdate(filePath)))
    
    } else {
  
      return source
        .pipe(plumber())
        .pipe(gulp_eslint({ useEslintrc: true }))
        .pipe(gulp_eslint.format())
        .pipe(gulp_eslint.failAfterError())
        .pipe(gulp_rollup( Rollup, { format: 'cjs' }))
        .pipe(dest(Builder.paths.dist).on('end', () => LogUpdate(filePath)))
    }
  }, 

  scss_changed: function (source, filePath) {
    return source.pipe(plumber())
    .pipe(sass().on('error', sass.logError ))
    .pipe(gulp_postcss( PostCSS ))
    .pipe(rename(file => file.dirname = file.dirname.replace('scss', 'css') ))
    .pipe(dest(Builder.paths.dist)
    .on('end', () => LogUpdate(filePath)))
  }
};

const clear = function (__callback) {
  // Remove 'dist' folder before setup;
  if ( fs.existsSync(Builder.paths.dist) )
    fs.rmSync(Builder.paths.dist, { recursive: true });
  return __callback();
};

// ESLint Task;
const eslinter = function (__callback) {

  const source = src([
    ...Builder.globs.assets.common.linters.js,
    ...Builder.globs.assets.desktop.linters.js,
    ...Builder.globs.assets.mobile.linters.js,
    ...Builder.globs.assets.responsive.linters.js
  ], { base: './src' });

  return Pipes.eslint(source);
};

// Scripts Task;
const scripts = function (__callback) {

  const source = src([
    ...Builder.globs.assets.common.build.js,
    ...Builder.globs.assets.desktop.build.js,
    ...Builder.globs.assets.mobile.build.js,
    ...Builder.globs.assets.responsive.build.js
  ], { base: './src' });

  return Pipes.scripts(source);
};

// Styles Task;
const styles = function (__callback) {

  const source = src([
    ...Builder.globs.assets.common.build.scss,
    ...Builder.globs.assets.desktop.build.scss,
    ...Builder.globs.assets.mobile.build.scss,
    ...Builder.globs.assets.responsive.build.scss
  ], { base: './src' });

  return Pipes.styles(source);
};

// Images Task;
const images = function (__callback) {

  const source = src([
    ...Builder.globs.assets.common.build.images
  ], { base: './src' });
  return Pipes.images(source);
};

// Default Watch Task;
exports.watch = function (__callback) {

  // Watch Files;
  const js_watch = watch([
    ...Builder.globs.assets.common.build.js,
    ...Builder.globs.assets.desktop.build.js,
    ...Builder.globs.assets.mobile.build.js,
    ...Builder.globs.assets.responsive.build.js
  ]);

  const scss_watch = watch([
    ...Builder.globs.assets.common.build.scss,
    ...Builder.globs.assets.desktop.build.scss,
    ...Builder.globs.assets.mobile.build.scss,
    ...Builder.globs.assets.responsive.build.scss
  ]);

  // Files Changed;
  const jsChanged = function (filePath) {

    const source = src(filePath, { base: './src' });
    return Pipes.js_changed(source, filePath);
  };

  const scssChanged = function (filePath) {

    const source = src(filePath, { base: './src' });
    return Pipes.scss_changed(source, filePath);
  };

  js_watch.on('change', jsChanged);
  scss_watch.on('change', scssChanged);

  // Watch Modules;
  const js_modules_watch = watch([
    ...Builder.globs.assets.common.build.js_modules,
    ...Builder.globs.assets.desktop.build.js_modules,
    ...Builder.globs.assets.mobile.build.js_modules,
    ...Builder.globs.assets.responsive.build.js_modules
  ]);

  const scss_modules_watch = watch([
    ...Builder.globs.assets.common.build.scss_modules,
    ...Builder.globs.assets.desktop.build.scss_modules,
    ...Builder.globs.assets.mobile.build.scss_modules,
    ...Builder.globs.assets.responsive.build.scss_modules
  ]);

  // Modules Changed;
  const js_modules_Changed = function (filePath) {
    
    const parentPath = GetParentPath(filePath);
    const globs = `${parentPath}\\*.js`;
    const source = src(globs, { base: './src' });
    return Pipes.js_changed(source, filePath);
  };

  const scss_modules_Changed = function (filePath) {

    const parentPath = GetParentPath(filePath);
    const globs = `${parentPath}\\*.scss`;
    const source = src(globs, { base: './src' });
    return Pipes.scss_changed(source, filePath);
  };

  js_modules_watch.on('change', js_modules_Changed);
  scss_modules_watch.on('change', scss_modules_Changed);

  // Watch Images;
  watch([
    ...Builder.globs.assets.common.build.images
  ], images);

  __callback();

  // Clear console after start watching;
  console.clear();
  console.log(`[${`\x1b[2m`}${new Date().toLocaleTimeString()}${`\x1b[0m`}] ${`\x1b[36m`}Watching for changes...${`\x1b[0m`}\n`);
};

// Default Image Task;
exports.images = images;

// Default Build Task;
exports.build = series( clear, eslinter, scripts, styles, images );