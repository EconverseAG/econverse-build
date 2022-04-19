import { dest } from 'gulp';
import { Bundle } from '../gulp/rollup';
import plumber from 'gulp-plumber';
import gulp_tap from 'gulp-tap';
import gulp_eslint from 'gulp-eslint-new';
import gulp_imagemin from 'gulp-imagemin';
import gulp_postcss from 'gulp-postcss';
import gulp_prettier from 'gulp-prettier';
import gulp_rename from 'gulp-rename';
import gulp_htmlhint from 'gulp-htmlhint';
import gulp_sass from 'gulp-sass';
import gulp_stylelint from 'gulp-stylelint';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import node_sass from 'node-sass';
import prettierConfig from '../prettier.config';
import * as Utils from '../gulp/utils';
import * as Paths from '../gulp/paths';

// Check '--production' flag;
const isProduction = Utils.isProduction();

// Set SASS compiler;
gulp_sass.compiler = node_sass;

// Htmlhint gulp task pipeline;
export const Htmlhint = (source, callback) => {
  return source
    .pipe(plumber())
    .pipe(gulp_htmlhint())
    .pipe(gulp_htmlhint.reporter())
    .on('error', () => typeof callback === 'function' ? callback() : null)
    .on('finish', () => typeof callback === 'function' ? callback() : null);
};

// Prettier scripts
export const Prettier = (source, callback) => {
  return source
    .pipe(plumber())
    .pipe(gulp_prettier(prettierConfig))
    .pipe(dest('./src'))
    .on('error', () => typeof callback === 'function' ? callback() : null)
    .on('finish', () => typeof callback === 'function' ? callback() : null);
};

// Scripts gulp task pipeline;
export const Scripts = (source, callback) => {
  return source
    .pipe(plumber())
    .pipe(gulp_eslint({ useEslintrc: true }))
    .pipe(gulp_eslint.format())
    .pipe(gulp_tap(Bundle))
    .on('error', () => typeof callback === 'function' ? callback() : null)
    .on('finish', () => typeof callback === 'function' ? callback() : null);
};

// Sass gulp task pipeline;
export const Styles = (source, callback) => {
  
  let scss = source.pipe(plumber())
    .pipe(gulp_sass().on('error', gulp_sass.logError ));

  if ( isProduction ) {
    // Add production plugins here...
    scss = scss.pipe(gulp_postcss([
      true && autoprefixer(),
      true && cssnano()
    ].filter( Boolean )));
  }

  scss = scss.pipe(gulp_rename(file => file.dirname = file.dirname.replace('scss', 'css') ))
    .pipe(dest(Paths.Folders.dist))
    .on('error', () => typeof callback === 'function' ? callback() : null)
    .on('finish', () => typeof callback === 'function' ? callback() : null);

  return scss;
};

// Eslint gulp task pipeline;
export const Eslint = (source, callback) => {
  return source
    .pipe(plumber())
    .pipe(gulp_eslint({ useEslintrc: true }))
    .pipe(gulp_eslint.format())
    .on('error', () => typeof callback === 'function' ? callback() : null)
    .on('finish', () => typeof callback === 'function' ? callback() : null);
};

// Stylelint gulp task pipeline;
export const Stylelint = (source, callback) => {
  return source
    .pipe(plumber())
    .pipe(gulp_stylelint({ reporters: [{ formatter: 'string', console: true }] }))
    .on('error', () => typeof callback === 'function' ? callback() : null)
    .on('finish', () => typeof callback === 'function' ? callback() : null);
};

// Images gulp task pipeline;
export const Images = (source, callback) => {
  return source
    .pipe(plumber())
    .pipe(gulp_imagemin({ silent: true }))
    .pipe(dest(Paths.Folders.dist))
    .on('error', () => typeof callback === 'function' ? callback() : null)
    .on('finish', () => typeof callback === 'function' ? callback() : null);
};