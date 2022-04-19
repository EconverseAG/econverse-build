/**
 * Econverse Build
 * https://econverse.digital/
 * Author: Vitor Seles <vitor.seles@econverse.com.br>
 * Repository / Docs: <https://github.com/vseles/econverse-build>
*/

import { series } from 'gulp';
import * as Tasks from './gulp/tasks';

// Declare watch task;
exports.watch = Tasks.watcher;

// Declare clear task;
exports.clear = Tasks.clear;

// Declare HTMLHINT task;
exports.htmlhint = Tasks.htmlhint;

// Declare stylelint task;
exports.stylelint = Tasks.stylelint;

// Declare eslint task;
exports.eslint = Tasks.eslint;

// Declare Prettier task;
exports.prettier = Tasks.prettier;

// Declare Images task;
exports.images = Tasks.images;

// Declare build task as series;
exports.build = series(
  Tasks.clear,
  Tasks.scripts,
  Tasks.styles
);